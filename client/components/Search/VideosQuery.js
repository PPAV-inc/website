import { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const QUERY = gql`
  query searchVideos(
    $keyword: String!
    $mode: String!
    $sort: String!
    $models: [String!]!
    $page: Int!
  ) {
    searchVideos(
      keyword: $keyword
      mode: $mode
      sort: $sort
      models: $models
      page: $page
    ) {
      total
      results {
        _id
        title
        models
        img_url
        code
        total_view_count
        publishedAt
        videos {
          source
          url
          view_count
        }
        score
        length
        tags
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
  options: ({
    keyword = '',
    mode = '女優',
    sort = 'total_view_count',
    models = [],
    page = 1,
  }) => ({
    variables: { keyword, mode, sort, models, page: page - 1 },
  }),
})(VideosQuery);
