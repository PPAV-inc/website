import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Select, Col } from 'antd';

const { Option } = Select;

class Filter extends Component {
  render() {
    const { videos, onSortChange } = this.props;
    console.log(videos);

    return (
      <Row gutter={16} type="flex" justify="start">
        <Col span={3}>
          <Select
            defaultValue="total_view_count"
            onChange={onSortChange}
            style={{ width: '100%' }}
          >
            <Option value="total_view_count">依人氣</Option>
            <Option value="score">依分數</Option>
            <Option value="publishedAt">依發佈時間</Option>
            <Option value="length">依影片長度</Option>
          </Select>
        </Col>
      </Row>
    );
  }
}

Filter.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object),
  onSortChange: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  videos: [],
};

export default Filter;
