import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

const { Header: AntdHeader } = Layout;

class Header extends Component {
  render() {
    return (
      <AntdHeader>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </AntdHeader>
    );
  }
}

export default Header;
