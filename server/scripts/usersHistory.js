import pMap from 'p-map';

import { getMongoDatabase } from '../src/database';

require('dotenv').config();

(async function() {
  const db = await getMongoDatabase();

  const now = new Date();

  const aggs = [
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
  ];

  const lastModified = await db
    .collection('users_history')
    .find()
    .sort({ updatedAt: -1 })
    .limit(1)
    .toArray();

  if (lastModified.length > 0) {
    aggs.unshift({
      $match: { createdAt: { $gte: lastModified[0].updatedAt } },
    });
  }

  const newUsersHistory = await db
    .collection('logs')
    .aggregate(aggs)
    .toArray();

  console.log(`newUsersHistory length: ${newUsersHistory.length}`);

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
