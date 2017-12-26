import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Card, Button } from 'antd';
import styled from 'styled-components';

import { Link } from '../../routes';

const { Meta } = Card;

const FirstRow = styled(Row)`
  margin-bottom: 30px;
`;

class Videos extends Component {
  renderVideos = videos =>
    videos.map(({ code, img_url: imgURL, title, publishedAt }) => (
      <Col span={8} key={code}>
        <Card hoverable cover={<img alt={code} src={imgURL} />}>
          <Meta
            title={<span style={{ whiteSpace: 'normal' }}>{title}</span>}
            description={publishedAt}
          />
        </Card>
      </Col>
    ));

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
        <FirstRow gutter={16}>{this.renderVideos(videos.slice(0, 3))}</FirstRow>
        <Row gutter={16}>{this.renderVideos(videos.slice(3))}</Row>
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
