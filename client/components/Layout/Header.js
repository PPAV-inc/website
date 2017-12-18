import React, { Component } from 'react';
import { Layout, Row, Col, Input } from 'antd';
import styled from 'styled-components';

import logo from '../../static/logo.png';
import { Link } from '../../routes';

const { Header: AntdHeader } = Layout;

const StyledHeader = styled(AntdHeader)`
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: #fafafa;
  z-index: 99;
  line-height: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  height: 80px;
  padding: 20px 20px 20px 0;
  cursor: pointer;
`;

const SearchInput = styled(Input)`
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

class Header extends Component {
  state = {
    scrollY: 0,
    innerHeight: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    this.setState({ scrollY: window.scrollY, innerHeight: window.innerHeight });
  }

  render() {
    const { scrollY, innerHeight } = this.state;
    const shouldShow = scrollY > innerHeight;
    return (
      <div>
        {shouldShow ? (
          <StyledHeader>
            <Row>
              <Col xs={4} md={2} xl={2}>
                <Link route="/?logo=1">
                  <Logo src={logo} alt="Logo" />
                </Link>
              </Col>
              <Col xs={18} md={9} xl={9}>
                <SearchInput placeholder="試試「波多野結衣」" />
              </Col>
              <Col xs={2} md={1} xl={1}>
                <SearchButton>搜尋</SearchButton>
              </Col>
            </Row>
          </StyledHeader>
        ) : null}
      </div>
    );
  }
}

export default Header;
