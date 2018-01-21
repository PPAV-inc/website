import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Button, List, Badge } from 'antd';
import styled from 'styled-components';

const Poster = styled.img`
  width: 100%;
`;

const ModalBody = styled(Row)`
  padding: 5px 10px;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: #484848;
  font-weight: 700;
  word-wrap: break-word;
  letter-spacing: -0.6px;
`;

const Item = styled.h4`
  margin: 0 0 5px;
  padding: 0;
  color: #484848;
  word-wrap: break-word;
`;

class VideoModal extends Component {
  render() {
    const {
      visible,
      data: { _id, code, title, img_url: imgURL, videos },
      toggleShowModal,
    } = this.props;

    return (
      <Modal
        closable={false}
        visible={visible}
        width="60%"
        footer={null}
        style={{ top: 30 }}
        bodyStyle={{ padding: 0 }}
        onCancel={() => {
          toggleShowModal(_id);
        }}
      >
        <Poster alt={code} src={imgURL} />
        <ModalBody type="flex" justify="start">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Title>{title}</Title>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Item>影片來源：</Item>
          </Col>
          <List
            grid={{ gutter: 5, xs: 1, sm: 2, md: 4, lg: 4, xl: 6 }}
            style={{ width: '100%' }}
            dataSource={videos}
            renderItem={video => (
              <List.Item style={{ textAlign: 'center' }}>
                <Badge count={video.view_count} overflowCount={10000}>
                  <Button href={video.url} target="_blank" size="large">
                    <b>{video.source}</b>
                  </Button>
                </Badge>
              </List.Item>
            )}
          />
        </ModalBody>
      </Modal>
    );
  }
}

VideoModal.propTypes = {
  data: PropTypes.object.isRequired,
  toggleShowModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default VideoModal;
