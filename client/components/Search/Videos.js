import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import VideosRow from '../shared/VideosRow';

class Videos extends Component {
  render() {
    const { data } = this.props;

    return (
      <Row gutter={16} type="flex" justify="start">
        <VideosRow data={data} colSpan={6} />
      </Row>
    );
  }
}

Videos.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

Videos.defaultProps = {
  data: [],
};

export default Videos;
