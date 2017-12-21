import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  height: 48px;
  padding: 0 10px;
  background-color: #fff;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  font-size: 19px;
  line-height: 24px;
  color: #484848;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 0;
`;

const SearchButton = styled.button`
  width: 100%;
  height: 48px;
  margin: 14px 0;
  background: #e73f0c;
  color: #fff;
  cursor: pointer;
  line-height: 48px;
`;

class SearchInput extends Component {
  render() {
    return (
      <Row type="flex" justify="center" align="middle">
        <Col xs={20} md={20} xl={20}>
          <StyledInput placeholder="試試「波多野結衣」" />
        </Col>
        <Col xs={4} md={4} xl={4}>
          <SearchButton>搜尋</SearchButton>
        </Col>
      </Row>
    );
  }
}

export default SearchInput;
