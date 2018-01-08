import { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const QUERY = gql`
  query searchVideos($keyword: String!, $sort: String!) {
    searchVideos(keyword: $keyword, sort: $sort) {
      total
      results {
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
    return this.props.children(this.props.data);
  }
}

VideosQuery.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default graphql(QUERY, {
  options: ({ keyword = '', sort = 'total_view_count' }) => ({
    variables: { keyword, sort },
  }),
})(VideosQuery);
