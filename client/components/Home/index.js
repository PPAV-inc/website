import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import logo from '../../static/logo.png';
import { Link } from '../../routes';

import SearchInput from './SearchInput';

const VIDEOS_NUMBER = 6;
const videosFragment = gql`
  fragment SimpleVideo on Video {
    title
    models
    img_url
    code
    total_view_count
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

const Logo = styled.img`
  height: 80px;
  padding: 20px 20px 20px 0;
  cursor: pointer;
`;

class Home extends Component {
  render() {
    return (
      <SearchSection>
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
          style={{ height: '100%' }}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col span={12}>
            <SearchInput />
          </Col>
        </Row>
      </SearchSection>
    );
  }
}

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
