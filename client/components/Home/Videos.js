import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Card, Button, Tag } from 'antd';
import styled from 'styled-components';
import format from 'date-fns/format';

import { Link } from '../../routes';

const { Meta } = Card;

const FirstRow = styled(Row)`
  margin-bottom: 30px;
`;

class Videos extends Component {
  renderVideos = videos =>
    videos.map(
      ({
        code,
        img_url: imgURL,
        title,
        publishedAt,
        models,
        tags,
        total_view_count: totalViewCount,
      }) => (
        <Col span={8} key={code}>
          <Card hoverable cover={<img alt={code} src={imgURL} />}>
            <Meta
              title={
                <span style={{ whiteSpace: 'normal' }}>
                  <b>{`[${code}]`}</b>
                  <br />
                  {`${title}`}
                </span>
              }
              description={
                <div>
                  <span>{`🎬 ${models.join(', ')}`}</span>
                  <br />
                  <span>
                    {`🗓 ${format(publishedAt, 'YYYY/MM/DD')} 👁 ${
                      totalViewCount
                    }`}
                  </span>
                  <br />
                  <br />
                  {tags.map(tag => <Tag color="magenta">{tag}</Tag>)}
                </div>
              }
            />
          </Card>
        </Col>
      )
    );

  render() {
    const { title, videos } = this.props;
    console.log(videos);

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
