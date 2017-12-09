import { ObjectId } from 'mongodb';

import { getMongoDatabase } from '../../database';

export default async (obj, args) => {
  const db = await getMongoDatabase();
  const { id } = args;

  return db.collection('videos').findOne({ _id: ObjectId(id) });
};
