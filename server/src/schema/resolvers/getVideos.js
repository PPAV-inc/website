import subDays from 'date-fns/sub_days';

import { getMongoDatabase, getElasticsearchDatabase } from '../../database';

export default async (obj, args) => {
  const { keyword } = args;
  if (keyword) {
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

    return hits.map(hit => ({ _id: hit._id, ...hit._source }));
  }

  const { days = 7, models = [], tags = [], sources = [], sort } = args;

  const db = await getMongoDatabase();
  const daysBefore = subDays(new Date(), days);

  const aggregateArr = [{ $match: { updated_at: { $gte: daysBefore } } }];

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

  // FIXME: should remove before production released
  aggregateArr.push({ $limit: 10 });

  return db
    .collection('videos')
    .aggregate(aggregateArr)
    .toArray();
};
