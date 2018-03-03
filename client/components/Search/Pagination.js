import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Pagination as AntdPagination } from 'antd';

export default class Pagination extends PureComponent {
  render() {
    const { currentPage, onChange, total } = this.props;

    return (
      <Row type="flex" justify="center">
        <AntdPagination
          onChange={onChange}
          current={currentPage}
          pageSize={20}
          total={total}
          style={{ marginTop: '80px' }}
        />
      </Row>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
