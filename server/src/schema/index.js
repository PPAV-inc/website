import { makeExecutableSchema } from 'graphql-tools';

import getDatabase from '../database';

const typeDefs = `
  type Query {
    videos: [Videos]
  }

  type Videos {
    _id: String,
    title: String,
    models: [String],
    img_url: String,
    code: String,
    total_view_count: Int,
  }
`;

const resolvers = {
  Query: {
    async videos() {
      const db = await getDatabase();

      return db
        .collection('videos')
        .find()
        .toArray();
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
