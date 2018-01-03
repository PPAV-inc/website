import ObjectId from 'mongodb';
import subDays from 'date-fns/sub_days';

import { getMongoDatabase } from '../../database';

export default async () => {
  const db = await getMongoDatabase();

  const sevenDaysBefore = subDays(new Date(), 7);
  let hotVideos = await db
    .collection('logs')
    .aggregate([
      { $match: { createdAt: { $gte: sevenDaysBefore } } },
      {
        $group: {
          _id: '$videoId',
          videoId: { $first: '$videoId' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 100 },
      { $sample: { size: 6 } },
    ])
    .toArray();

  hotVideos = hotVideos.map(video => ObjectId(video.videoId));

  const results = await db
    .collection('videos')
    .find({ _id: { $in: hotVideos } })
    .toArray();

  return results;
};
