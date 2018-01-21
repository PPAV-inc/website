import { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const QUERY = gql`
  query video($id: String!) {
    video(id: $id) {
      _id
      title
      models
      img_url
      code
      total_view_count
      videos {
        source
        url
        view_count
      }
      length
      tags
      publishedAt
    }
  }
`;

class VideoQuery extends Component {
  render() {
    if (!this.props.data.loading) {
      return this.props.children(this.props.data);
    }

    return null;
  }
}

VideoQuery.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default graphql(QUERY, {
  options: ({ id }) => ({
    variables: { id },
  }),
})(VideoQuery);
