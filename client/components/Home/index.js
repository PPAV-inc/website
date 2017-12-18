import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import SearchInput from './SearchInput';

const homePageQuery = gql`
  query videos {
    videos {
      title
      models
      img_url
      code
      total_view_count
      publishedAt
    }
  }
`;

const SearchSection = styled.section`
  height: 70vh;
  width: 100%;
`;

class Home extends Component {
  render() {
    return (
      <SearchSection>
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

export default compose(graphql(homePageQuery))(Home);
