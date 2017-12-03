import { makeExecutableSchema } from 'graphql-tools';
import { ObjectId } from 'mongodb';
import subDays from 'date-fns/sub_days';

import getDatabase from '../database';

const typeDefs = `
  scalar Date

  type Query {
    videos: [Videos],
    getNewVideos: [Videos],
    getHotVideos: [Videos],
  }

  type Videos {
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
    source: String!,
    url: String!,
    view_count: Int,
  }
`;

const resolvers = {
  Query: {
    async videos() {
      const db = await getDatabase();

      return db
        .collection('videos')
        .find()
        .limit(5)
        .toArray();
    },
    async getNewVideos() {
      const db = await getDatabase();
      const oneDaysBefore = subDays(new Date(), 100);

      // FIXME: store user click url and new button

      return db
        .collection('videos')
        .aggregate([
          { $match: { updated_at: { $gte: oneDaysBefore } } },
          { $sort: { publishedAt: -1, total_view_count: -1 } },
          { $limit: 100 },
          { $sample: { size: 5 } },
        ])
        .toArray();
    },
    async getHotVideos() {
      const db = await getDatabase();
      const sevenDaysBefore = subDays(new Date(), 7);

      let hotVideos = await db
        .collection('logs')
        .aggregate([
          { $match: { createdAt: { $gte: sevenDaysBefore } } },
          {
            $group: {
              _id: '$videoId',
              videoId: { $first: '$videoId' },
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },
          { $limit: 100 },
          { $sample: { size: 5 } },
        ])
        .toArray();

      // FIXME: store user click url and hot button

      if (hotVideos.length > 0) {
        hotVideos = hotVideos.map(video => ObjectId(video.videoId));

        return db
          .collection('videos')
          .find({ _id: { $in: hotVideos } })
          .toArray();
      }

      return db
        .collection('videos')
        .find()
        .sort({ total_view_count: -1 })
        .limit(5)
        .toArray();
    },
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
