import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Button, List, Badge, Tag } from 'antd';
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

const Content = styled.div`
  width: 95%;
`;

class VideoModal extends Component {
  render() {
    const {
      visible,
      data: {
        _id,
        code,
        title,
        img_url: imgURL,
        models,
        videos,
        tags,
        length,
        score,
      },
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
            <List>
              <List.Item>
                <List.Item.Meta title="番號" />
                <Content>
                  <b>{code}</b>
                </Content>
              </List.Item>
              <List.Item>
                <List.Item.Meta title="女優" />
                <Content>
                  {models.map(model => (
                    <Tag color="magenta" key={model}>
                      {model}
                    </Tag>
                  ))}
                </Content>
              </List.Item>
              <List.Item>
                <List.Item.Meta title="長度" />
                <Content>{`${length} 分鐘`}</Content>
              </List.Item>
              <List.Item>
                <List.Item.Meta title="分數" />
                <Content>{score}</Content>
              </List.Item>
              <List.Item>
                <List.Item.Meta title="標籤" />
                <Content>
                  {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </Content>
              </List.Item>
              <List.Item>
                <List.Item.Meta title="影片" />
                <Content>
                  <List
                    style={{ width: '100%' }}
                    grid={{ gutter: 5, xs: 1, sm: 2, md: 4, lg: 4, xl: 6 }}
                    dataSource={videos}
                    renderItem={video => (
                      <List.Item
                        style={{
                          textAlign: 'center',
                          marginBottom: 5,
                          marginTop: 5,
                        }}
                      >
                        <Badge count={video.view_count} overflowCount={10000}>
                          <Button href={video.url} target="_blank" size="large">
                            <b>{video.source}</b>
                          </Button>
                        </Badge>
                      </List.Item>
                    )}
                  />
                </Content>
              </List.Item>
            </List>
          </Col>
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
