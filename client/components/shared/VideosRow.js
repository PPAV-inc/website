import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Card, Tag } from 'antd';
import format from 'date-fns/format';
import createHistory from 'history/createBrowserHistory';

import VideoQuery from '../Video/VideoQuery';
import VideoModal from '../Video/VideoModal';

let history;

const { Meta } = Card;

class VideosRow extends Component {
  state = {
    showModal: this.props.videos.reduce((accumulator, video) => {
      accumulator[video.code] = false;
      return accumulator;
    }, {}),
  };

  componentDidMount() {
    history = createHistory();

    history.listen((location, action) => {
      if (action === 'POP') {
        if (location.key) {
          // 下一頁
          const regexp = /\/video\/(\S*)/g;
          const code = regexp.exec(location.pathname)[1];

          this.toggleShowModal(code);
        } else {
          // 上一頁
          this.resetState();
        }
      }
    });
  }

  resetState = () => {
    const { showModal } = this.state;
    const newShowModal = Object.assign(showModal);

    Object.keys(newShowModal).forEach(key => (newShowModal[key] = false));

    this.setState(() => ({
      showModal: newShowModal,
    }));
  };

  toggleShowModal = code => {
    const { showModal } = this.state;

    showModal[code] = !showModal[code];
    this.setState({
      showModal,
    });
  };

  render() {
    const { showModal } = this.state;
    const { videos, colSpan } = this.props;

    return videos.map(
      ({
        code,
        img_url: imgURL,
        title,
        publishedAt,
        models,
        tags,
        total_view_count: totalViewCount,
      }) => (
        <Col span={colSpan} key={code} style={{ padding: '5px' }}>
          <VideoQuery code={code}>
            {({ video: data }) => (
              <VideoModal
                data={data}
                visible={showModal[code] || false}
                toggleShowModal={() => {
                  this.toggleShowModal(code);
                  history.goBack();
                }}
              />
            )}
          </VideoQuery>
          <Card
            hoverable
            cover={<img alt={code} src={imgURL} />}
            onClick={() => {
              this.toggleShowModal(code);
              history.push(`/video/${code}`);
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
