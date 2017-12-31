import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import logo from '../../static/logo.png';
import { Link } from '../../routes';
import SearchInput from '../shared/SearchInput';

import Videos from './Videos';

const VIDEOS_NUMBER = 6;
const videosFragment = gql`
  fragment SimpleVideo on Video {
    title
    models
    img_url
    code
    total_view_count
    tags
    publishedAt
  }
`;

const videosQuery = gql`
  query videos($sort_hot: String!, $sort_latest: String!, $limit: Int!) {
    hot: videos(sort: $sort_hot, limit: $limit) {
      ...SimpleVideo
    }
    latest: videos(sort: $sort_latest, limit: $limit) {
      ...SimpleVideo
    }
  }
  ${videosFragment}
`;

const SearchSection = styled.section`
  height: 70vh;
  width: 100%;
`;

const VideosSection = styled.section`
  margin: 80px;
`;

const Logo = styled.img`
  height: 80px;
  padding: 20px 20px 20px 0;
  cursor: pointer;
`;

class Home extends Component {
  render() {
    const { videosQuery: { hot, latest } } = this.props;

    return [
      <SearchSection key="searchSection">
        <Row
          type="flex"
          justify="start"
          align="middle"
          style={{ margin: '0 50px' }}
        >
          <Col>
            <Link route="/?logo=1">
              <Logo src={logo} alt="Logo" />
            </Link>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: '100%' }}
        >
          <Col span={12}>
            <SearchInput />
          </Col>
        </Row>
      </SearchSection>,
      <VideosSection key="hot">
        {hot ? <Videos title="熱門影片" videos={hot} /> : null}
      </VideosSection>,
      <VideosSection key="latest">
        {latest ? <Videos title="最新影片" videos={latest} /> : null}
      </VideosSection>,
    ];
  }
}

Home.propTypes = {
  videosQuery: PropTypes.object,
};

Home.defaultProps = {
  videosQuery: {},
};

export default compose(
  graphql(videosQuery, {
    name: 'videosQuery',
    options: {
      variables: {
        sort_hot: 'total_view_count',
        sort_latest: 'publishedAt',
        limit: VIDEOS_NUMBER,
      },
    },
  })
)(Home);
