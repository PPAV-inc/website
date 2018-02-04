import { getMongoDatabase } from '../../database';

export default async (obj, args) => {
  const db = await getMongoDatabase();
  const { code } = args;

  return db.collection('videos').findOne({ code });
};
