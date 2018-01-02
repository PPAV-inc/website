import subDays from 'date-fns/sub_days';
import set from 'lodash/set';

import { getMongoDatabase, getElasticsearchDatabase } from '../../database';

export default async (obj, args) => {
  const {
    days = -1,
    models = [],
    tags = [],
    sources = [],
    // FIXME
    // sort,
    // page = 0,
    keyword,
  } = args;
  const db = await getMongoDatabase();
  let results;

  const aggregateArr = [];
  const isPPAV = /^ppav$/i.test(keyword);

  if (days > -1) {
    const daysBefore = subDays(new Date(), days);
    aggregateArr.push({ $match: { updated_at: { $gte: daysBefore } } });
  }
  if (models.length > 0) {
    aggregateArr.push({ $match: { models: { $in: models } } });
  }
  if (tags.length > 0) {
    aggregateArr.push({ $match: { tags: { $in: tags } } });
  }
  if (sources.length > 0) {
    aggregateArr.push({ $match: { 'videos.source': { $in: sources } } });
  }

  if (aggregateArr.length > 0 || isPPAV) {
    // aviod too many documents
    aggregateArr.push({ $limit: 1000 });

    if (isPPAV) {
      aggregateArr.push({ $sample: { size: 20 } });
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
            multi_match: {
              query: keyword,
              type: 'cross_fields',
              fields: ['tags^200', 'title^50', 'models^100', 'code^1000'],
            },
          },
        },
      },
      min_score: 50,
      size: 10,
    };

    if (results) {
      const filterIds = results.map(each => each._id);

      set(queryBody, 'query.bool.filter.terms._id', filterIds);
    }

    const { hits: { hits } } = await esClient.search({
      index: 'videos',
      type: 'videos',
      body: queryBody,
    });

    results = hits.map(hit => ({ _id: hit._id, ...hit._source }));
  }

  return results;
};
