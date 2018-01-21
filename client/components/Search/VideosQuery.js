import { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const QUERY = gql`
  query searchVideos($keyword: String!, $sort: String!, $models: [String]!) {
    searchVideos(keyword: $keyword, sort: $sort, models: $models) {
      total
      results {
        _id
        title
        models
        img_url
        code
        total_view_count
        tags
        publishedAt
      }
    }
  }
`;

class VideosQuery extends Component {
  render() {
    if (!this.props.data.loading) {
      return this.props.children(this.props.data);
    }

    return null;
  }
}

VideosQuery.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default graphql(QUERY, {
  options: ({ keyword = '', sort = 'total_view_count', models = [] }) => ({
    variables: { keyword, sort, models },
  }),
})(VideosQuery);
