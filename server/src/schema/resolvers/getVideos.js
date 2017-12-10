import subDays from 'date-fns/sub_days';

import { getMongoDatabase } from '../../database';

export default async (obj, args) => {
  const { days = 7, models = [], tags = [], sources = [] } = args;

  const db = await getMongoDatabase();
  const daysBefore = subDays(new Date(), days);

  const aggregateArr = [{ $match: { updated_at: { $gte: daysBefore } } }];

  if (models.length > 0) {
    aggregateArr.push({ $match: { models: { $in: models } } });
  }
  if (tags.length > 0) {
    aggregateArr.push({ $match: { models: { $in: tags } } });
  }
  if (sources.length > 0) {
    aggregateArr.push({ $match: { 'videos.source': { $in: sources } } });
  }

  // FIXME
  /*
  if (Object.keys(sort).length !== 0) {
    aggregateArr.push({ $sort: sort });
  }
  */

  aggregateArr.push({ $limit: 10 });

  return db
    .collection('videos')
    .aggregate(aggregateArr)
    .toArray();
};
