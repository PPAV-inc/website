import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import VideosRow from '../shared/VideosRow';

class Videos extends Component {
  render() {
    const { videos } = this.props;

    return (
      <Row gutter={16} type="flex" justify="space-around">
        <VideosRow videos={videos} colSpan={6} />
      </Row>
    );
  }
}

Videos.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object),
};

Videos.defaultProps = {
  videos: [],
};

export default Videos;
