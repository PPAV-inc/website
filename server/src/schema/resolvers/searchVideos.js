import subDays from 'date-fns/sub_days';
import set from 'lodash/set';

import { getMongoDatabase, getElasticsearchDatabase } from '../../database';

const PAGE_VIDEOS_NUMBER = 20;

export default async (obj, args) => {
  const { days, models, tags, sources, sort, page, keyword, mode } = args;
  const db = await getMongoDatabase();
  let results;
  let total = -1;

  let _mode;
  switch (mode) {
    case '標題':
      _mode = 'title';
      break;
    case '標籤':
      _mode = 'tags';
      break;
    case '女優':
    default:
      _mode = 'models';
  }

  const aggregateArr = [];
  const isPPAV = !keyword || /^ppav$/i.test(keyword);

  if (days) {
    const daysBefore = subDays(new Date(), days);
    aggregateArr.push({ $match: { updated_at: { $gte: daysBefore } } });
  }
  if (models && models.length > 0) {
    aggregateArr.push({ $match: { models: { $in: models } } });
  }
  if (tags && tags.length > 0) {
    aggregateArr.push({ $match: { tags: { $in: tags } } });
  }
  if (sources && sources.length > 0) {
    aggregateArr.push({ $match: { 'videos.source': { $in: sources } } });
  }

  if (aggregateArr.length > 0 || isPPAV) {
    // avoid too many documents
    // FIXME
    aggregateArr.push({ $limit: 100 });

    if (isPPAV) {
      aggregateArr.push({ $sample: { size: PAGE_VIDEOS_NUMBER } });
      if (sort) {
        aggregateArr.push({ $sort: { [sort]: -1 } });
      }
    } else {
      // _id For ES
      aggregateArr.push({ $project: { _id: 1 } });
    }

    results = await db
      .collection('videos')
      .aggregate(aggregateArr)
      .toArray();
  }

  if (!isPPAV) {
    const esClient = getElasticsearchDatabase();

    const queryBody = {
      query: {
        bool: {
          must: {
            match: {
              [_mode]: keyword,
            },
          },
        },
      },
      size: PAGE_VIDEOS_NUMBER,
    };

    const { aggregations: aggs } = await esClient.search({
      index: 'videos',
      type: 'videos',
      body: {
        ...queryBody,
        // Percentiles aggs, 取得 query 的分數統計
        aggs: {
          load_time_outlier: {
            percentiles: {
              script: '_score',
            },
          },
        },
      },
    });

    // set min_score to be PR 95%
    set(queryBody, 'min_score', aggs.load_time_outlier.values['95.0']);

    // get results from mongoDB
    if (results) {
      const filterIds = results.map(each => each._id);

      set(queryBody, 'query.bool.filter.terms._id', filterIds);
    }
    if (sort) {
      set(queryBody, `sort[0].${sort}`, 'desc');
    }
    if (page) {
      queryBody.from = page * PAGE_VIDEOS_NUMBER;
    }

    const result = await esClient.search({
      index: 'videos',
      type: 'videos',
      body: queryBody,
    });
    const {
      hits: { total: _total, hits },
    } = result;

    total = _total;

    results = hits.map(({ _id, _source }) => ({
      _id,
      ..._source,
      models: _source.models || [],
      tags: _source.tags || [],
    }));
  }

  return { results, total };
};
