import { getMongoDatabase } from '../../database';

export default async () => {
  const db = await getMongoDatabase();

  const results = await db
    .collection('videos')
    .find()
    .sort({ publishedAt: -1 })
    .limit(6)
    .toArray();

  return results;
};
