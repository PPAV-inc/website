import { MongoClient } from 'mongodb';
import elasticsearch from 'elasticsearch';

let _mongodb;
let _elasticsearchdb;
const { dbName } = process.env;

const getMongoDatabase = async () => {
  if (_mongodb) {
    return _mongodb;
  }

  const mongodbPath =
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_MONGODB_PATH
      : process.env.DEV_MONGODB_PATH;

  const client = await MongoClient.connect(
    mongodbPath,
    { useNewUrlParser: true }
  );

  _mongodb = client.db(dbName);
  return _mongodb;
};

const getElasticsearchDatabase = () => {
  if (_elasticsearchdb) {
    return _elasticsearchdb;
  }

  const esPath =
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_ES_PATH
      : process.env.DEV_ES_PATH;

  const db = new elasticsearch.Client({
    host: esPath,
    log: 'error',
  });
  _elasticsearchdb = db;

  return _elasticsearchdb;
};

export { getMongoDatabase, getElasticsearchDatabase };
