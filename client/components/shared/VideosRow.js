import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Card, Tag } from 'antd';
import format from 'date-fns/format';

import VideoQuery from './VideoQuery';
import VideoModal from './VideoModal';

const { Meta } = Card;

class VideosRow extends Component {
  state = {
    showModal: this.props.videos.reduce((accumulator, video) => {
      accumulator[video._id] = false;
      return accumulator;
    }, {}),
  };

  toggleShowModal = id => {
    const { showModal } = this.state;

    showModal[id] = !showModal[id];
    this.setState({
      showModal,
    });
  };

  render() {
    const { showModal } = this.state;
    const { videos, colSpan } = this.props;

    return videos.map(
      ({
        _id,
        code,
        img_url: imgURL,
        title,
        publishedAt,
        models,
        tags,
        total_view_count: totalViewCount,
      }) => (
        <Col span={colSpan} key={code} style={{ padding: '5px' }}>
          <VideoQuery id={_id}>
            {({ video: data }) => (
              <VideoModal
                data={data}
                visible={showModal[_id]}
                toggleShowModal={this.toggleShowModal}
              />
            )}
          </VideoQuery>
          <Card
            hoverable
            cover={<img alt={code} src={imgURL} />}
            onClick={() => {
              this.toggleShowModal(_id);
            }}
          >
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
                  <span role="img" aria-label="model">
                    🎬&nbsp;
                  </span>
                  {models.map(model => (
                    <Tag color="magenta" key={model}>
                      {model}
                    </Tag>
                  ))}
                  <br />
                  <span style={{ marginRight: '10px' }}>
                    {`🗓 ${format(publishedAt, 'YYYY/MM/DD')}`}
                  </span>
                  <span>{`👁 ${totalViewCount}`}</span>
                  <br />
                  <br />
                  {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              }
            />
          </Card>
        </Col>
      )
    );
  }
}

VideosRow.propTypes = {
  colSpan: PropTypes.number.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VideosRow;
