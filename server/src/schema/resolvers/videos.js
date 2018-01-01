import subDays from 'date-fns/sub_days';

import { getMongoDatabase, getElasticsearchDatabase } from '../../database';

export default async (obj, args) => {
  const {
    days = -1,
    models = [],
    tags = [],
    sources = [],
    sort,
    page = 0,
    keyword,
  } = args;
  const db = await getMongoDatabase();
  let results;

  const aggregateArr = [];

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
  if (sort) {
    aggregateArr.push({ $sort: { [sort]: -1 } });
  }
  if (page > 0) {
    aggregateArr.push({ $skip: page * 10 });
  }
  if (/^ppav$/i.test(keyword)) {
    aggregateArr.push({ $sample: { size: 20 } });
  }

  if (aggregateArr.length > 0) {
    if (!/^ppav$/i.test(keyword)) {
      // _id For ES
      aggregateArr.push({ $project: { _id: 1 } });
    }

    results = await db
      .collection('videos')
      .aggregate(aggregateArr)
      .toArray();
  }

  if (!/^ppav$/i.test(keyword)) {
    const esClient = getElasticsearchDatabase();

    const { hits: { hits } } = await esClient.search({
      index: 'videos',
      type: 'videos',
      body: {
        query: {
          multi_match: {
            query: keyword,
            type: 'cross_fields',
            fields: ['tags^200', 'title^50', 'models^100', 'code^1000'],
          },
        },
        min_score: 50,
        size: 10,
      },
    });

    results = hits.map(hit => ({ _id: hit._id, ...hit._source }));
  }

  return results;
};
