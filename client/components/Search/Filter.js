import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Select, Col } from 'antd';

const { Option } = Select;

class Filter extends Component {
  render() {
    const { videos, onSortChange, onModelsChange, filter } = this.props;

    const models = videos.reduce((accumulator, { models: _models }) => {
      _models.forEach(_model => {
        if (accumulator.indexOf(_model) === -1) {
          accumulator.push(_model);
        }
      });
      return accumulator;
    }, []);

    return (
      <Row gutter={16} type="flex" justify="start">
        <Col span={3}>
          <Select
            defaultValue={filter.sort}
            onChange={onSortChange}
            style={{ width: '100%' }}
          >
            <Option value="total_view_count">依人氣</Option>
            <Option value="score">依分數</Option>
            <Option value="publishedAt">依發佈時間</Option>
            <Option value="length">依影片長度</Option>
          </Select>
        </Col>
        <Col span={6}>
          <Select
            mode="multiple"
            placeholder="請選擇女優"
            onChange={onModelsChange}
            style={{ width: '100%' }}
          >
            {models.map(model => <Option key={model}>{model}</Option>)}
          </Select>
        </Col>
      </Row>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.object.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object),
  onModelsChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  videos: [],
};

export default Filter;
