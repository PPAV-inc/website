import { MongoClient } from 'mongodb';
import elasticsearch from 'elasticsearch';

let _mongodb;
let _elasticsearchdb;

const getMongoDatabase = async () => {
  if (_mongodb) {
    return _mongodb;
  }

  const mongodbPath =
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_MONGODB_PATH
      : process.env.PROD_MONGODB_PATH;

  const db = await MongoClient.connect(mongodbPath);
  _mongodb = db;
  return _mongodb;
};

const getElasticsearchDatabase = () => {
  if (_elasticsearchdb) {
    return _elasticsearchdb;
  }

  const esPath =
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_ES_PATH
      : process.env.PROD_ES_PATH;

  const db = new elasticsearch.Client({
    host: esPath,
    log: 'error',
  });
  _elasticsearchdb = db;

  return _elasticsearchdb;
};

export { getMongoDatabase, getElasticsearchDatabase };
