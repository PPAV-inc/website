import { makeExecutableSchema } from 'graphql-tools';

import { getVideo, getVideos } from './resolvers';

const typeDefs = `
  scalar Date

  type Query {
    getVideo(id: String!): Video,
    getVideos(keyword: String, models: [String], tags: [String], sources: [String], days: Int): [Video],
  }

  type Video {
    _id: String,
    title: String,
    models: [String],
    img_url: String,
    code: String,
    total_view_count: Int,
    videos: [Source],
    score: Float,
    length: Int,
    publishedAt: Date,
    tags: [String],
    updated_at: Date,
  }

  type Source {
    source: String,
    url: String,
    view_count: Int,
  }
`;

const resolvers = {
  Query: {
    getVideo,
    getVideos,
  },
  Date: {
    __serialize(value) {
      return new Date(value); // value sent to the client
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
