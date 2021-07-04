import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Select } from 'antd';
import styled, { css } from 'styled-components';

import { Router } from '../../routes';
import i18n from '../../lib/i18n';

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

  border: 0;
  border-radius: 3px;
  background: #e73f0c;
  color: #fff;
  cursor: pointer;
  line-height: 48px;

  ${(props) =>
    !props.inHeader &&
    css`
      margin-top: 32px;
    `}
`;

const SearchSelect = styled(Select)`
  display: flex;
  width: 100%;
  margin: 0 16px;
  font-size: 19px;
`;

const Option = Select.Option;

class SearchInput extends Component {
  state = {
    value: this.props.value,
    mode: this.props.mode,
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleClick = () => {
    Router.pushRoute(
      'search',
      { keyword: this.state.value, mode: this.state.mode, page: 1 },
      { shallow: true }
    );
  };

  handleSelectChange = (value) => {
    this.setState({ mode: value });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  };

  render() {
    const { inHeader } = this.props;

    return (
      <Fragment>
        <Row type="flex" justify={inHeader ? 'start' : 'center'} align="middle">
          <Col xs={9} md={12} xl={15}>
            <StyledInput
              placeholder={i18n.t('search_placeholder')}
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
              <Option value={i18n.t('mode_actress')}>
                {i18n.t('mode_actress')}
              </Option>
              <Option value={i18n.t('mode_title')}>
                {i18n.t('mode_title')}
              </Option>
              <Option value={i18n.t('mode_tag')}>{i18n.t('mode_tag')}</Option>
              <Option value={i18n.t('mode_number')}>
                {i18n.t('mode_number')}
              </Option>
            </SearchSelect>
          </Col>
          {inHeader && (
            <Col span={3}>
              <SearchButton inHeader={inHeader} onClick={this.handleClick}>
                {i18n.t('search')}
              </SearchButton>
            </Col>
          )}
        </Row>
        {!inHeader && (
          <Row type="flex" justify="center">
            <Col span={12}>
              <SearchButton inHeader={inHeader} onClick={this.handleClick}>
                {i18n.t('search')}
              </SearchButton>
            </Col>
          </Row>
        )}
      </Fragment>
    );
  }
}

SearchInput.propTypes = {
  value: PropTypes.string,
  mode: PropTypes.string,
};

SearchInput.defaultProps = {
  value: '',
  mode: i18n.t('mode_actress'),
};

export default SearchInput;
