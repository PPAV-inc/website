import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

class VideoModal extends Component {
  render() {
    return (
      <Modal visible={this.props.visible}>
        <p>{JSON.stringify(this.props.data, null, 2)}</p>
      </Modal>
    );
  }
}

VideoModal.propTypes = {
  data: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default VideoModal;
