import { getElasticsearchDatabase } from '../../database';

export default async (obj, args) => {
  const { model } = args;

  const esClient = getElasticsearchDatabase();

  const queryBody = {
    query: {
      match: {
        models: model,
      },
    },
    aggregations: {
      relevant_model: {
        significant_terms: {
          field: 'models.keyword',
          min_doc_count: 1,
          size: 5,
        },
      },
    },
  };

  const {
    aggregations: { relevant_model: { buckets } },
  } = await esClient.search({
    index: 'tmp_index',
    type: 'tmp_type',
    body: queryBody,
  });

  return buckets.map(({ key }) => key);
};
