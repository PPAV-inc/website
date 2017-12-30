import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Card, Button } from 'antd';
import styled from 'styled-components';

import VideosRow from '../shared/VideosRow';
import { Link } from '../../routes';

const FirstRow = styled(Row)`
  margin-bottom: 30px;
`;

class Videos extends Component {
  render() {
    const { title, videos } = this.props;

    return (
      <Card
        title={<h3>{title}</h3>}
        bordered={false}
        extra={
          <Link route="/">
            <Button>更多...</Button>
          </Link>
        }
      >
        <FirstRow gutter={16} type="flex" justify="space-around">
          <VideosRow videos={videos.slice(0, 3)} colSpan={8} />
        </FirstRow>
        <Row gutter={16}>
          <VideosRow videos={videos.slice(3)} colSpan={8} />
        </Row>
      </Card>
    );
  }
}

Videos.propTypes = {
  title: PropTypes.string,
  videos: PropTypes.arrayOf(PropTypes.object),
};

Videos.defaultProps = {
  title: '',
  videos: [],
};

export default Videos;
