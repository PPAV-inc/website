import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Router } from '../../routes';

import VideoQuery from './VideoQuery';
import VideoModal from './VideoModal';

class Video extends Component {
  render() {
    const { code } = this.props.url.query;

    return (
      <VideoQuery code={code}>
        {({ video: data }) => (
          <VideoModal
            data={data}
            visible
            toggleShowModal={() => {
              Router.pushRoute('index', {}, { shallow: true });
            }}
          />
        )}
      </VideoQuery>
    );
  }
}

Video.propTypes = {
  url: PropTypes.object.isRequired,
};

export default Video;
