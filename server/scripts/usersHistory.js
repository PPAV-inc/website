import subDays from 'date-fns/sub_days';
import pMap from 'p-map';

import { getMongoDatabase } from '../src/database';

require('dotenv').config();

(async function() {
  const db = await getMongoDatabase();

  const now = new Date();
  const daysBefore = subDays(now, 1);

  const newUsersHistory = await db
    .collection('logs')
    .aggregate([
      { $match: { createdAt: { $gte: daysBefore } } },
      {
        $lookup: {
          from: 'videos',
          localField: 'videoId',
          foreignField: '_id',
          as: 'info',
        },
      },
      { $unwind: '$info' },
      { $unwind: '$info.models' },
      {
        $group: {
          _id: '$userId',
          codes: { $addToSet: '$info.code' },
          models: { $addToSet: '$info.models' },
        },
      },
      {
        $project: {
          userId: '$_id',
          codes: 1,
          models: 1,
        },
      },
    ])
    .toArray();

  await pMap(
    newUsersHistory,
    async user => {
      await db.collection('users_history').updateOne(
        { userId: user.userId },
        {
          $addToSet: {
            models: { $each: user.models },
            codes: { $each: user.codes },
          },
          $set: { userId: user.userId, updatedAt: now },
        },
        { upsert: true }
      );
    },
    { concurrency: 20 }
  );

  await db.close();
})();
