import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Select } from 'antd';
import styled from 'styled-components';

import { Router } from '../../routes';

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
  border-radius: 3px;
  background: #e73f0c;
  color: #fff;
  cursor: pointer;
  line-height: 48px;
`;

const SearchSelect = styled(Select)`
  width: 100%;
  height: 48px;
  padding: 5px 5px;
  font-size: 19px;
`;

const Option = Select.Option;

class SearchInput extends Component {
  state = {
    value: this.props.value,
    mode: this.props.mode,
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleClick = () => {
    Router.pushRoute(
      'search',
      { keyword: this.state.value, mode: this.state.mode, page: 1 },
      { shallow: true }
    );
  };

  handleSelectChange = value => {
    this.setState({ mode: value });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  };

  render() {
    return (
      <Row type="flex" justify="center" align="middle">
        <Col xs={15} md={15} xl={15}>
          <StyledInput
            placeholder="試試「波多野結衣」"
            value={this.state.value}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </Col>
        <Col>
          <SearchSelect
            name="selectMode"
            defaultValue={this.state.mode}
            onChange={this.handleSelectChange}
          >
            <Option value="女優">女優</Option>
            <Option value="標題">標題</Option>
            <Option value="標籤">標籤</Option>
            <Option value="番號">番號</Option>
          </SearchSelect>
        </Col>
        <Col xs={4} md={4} xl={4}>
          <SearchButton onClick={this.handleClick}>搜尋</SearchButton>
        </Col>
      </Row>
    );
  }
}

SearchInput.propTypes = {
  value: PropTypes.string,
  mode: PropTypes.string,
};

SearchInput.defaultProps = {
  value: '',
  mode: '女優',
};

export default SearchInput;
