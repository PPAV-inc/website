import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
import styled from 'styled-components';

import SearchInput from '../shared/SearchInput';
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

class Header extends Component {
  state = {
    scrollY: 0,
    innerHeight: 0,
  };

  componentDidMount() {
    if (!this.props.shouldShow) {
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  componentWillUnmount() {
    if (!this.props.shouldShow) {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  handleScroll() {
    this.setState({ scrollY: window.scrollY, innerHeight: window.innerHeight });
  }

  render() {
    const { scrollY, innerHeight } = this.state;
    const shouldShow = this.props.shouldShow || scrollY > innerHeight;

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
              <Col xs={20} md={10} xl={10}>
                <SearchInput value={this.props.value} />
              </Col>
            </Row>
          </StyledHeader>
        ) : null}
      </div>
    );
  }
}

Header.propTypes = {
  shouldShow: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

Header.defaultProps = {
  shouldShow: false,
};

export default Header;
