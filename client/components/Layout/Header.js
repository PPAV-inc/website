import React, { Component } from 'react';
import { Layout, Row, Col, Input } from 'antd';
import styled from 'styled-components';

import logo from '../../static/logo.png';
import { Link } from '../../routes';

const { Header: AntdHeader } = Layout;
const { Search } = Input;

const StyledHeader = styled(AntdHeader)`
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: #fafafa;
  line-height: 80px;
`;

const Logo = styled.img`
  height: 80px;
  padding: 20px;
  cursor: pointer;
`;

const StyledSearch = styled(Search)`
  > input {
    height: 48px;
    background-color: #fff;
    border-width: 1px;
    border-style: solid;
    border-radius: 2px;
    font-size: 19px;
    line-height: 24px;
    color: #484848;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 0;
  }
`;

class Header extends Component {
  render() {
    return (
      <StyledHeader>
        <Row>
          <Col xs={2} md={2} xl={2}>
            <Link route="/?logo=1">
              <Logo src={logo} alt="Logo" />
            </Link>
          </Col>
          <Col xs={16} md={12} xl={10}>
            <StyledSearch placeholder="試試「波多野結衣」" />
          </Col>
        </Row>
      </StyledHeader>
    );
  }
}

export default Header;
