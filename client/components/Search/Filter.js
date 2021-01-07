import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Select, Col } from 'antd';
import i18n from '../../lib/i18n';

const { Option } = Select;

class Filter extends Component {
  render() {
    const { data, onSortChange, onModelsChange, filter } = this.props;

    const models = data.reduce((accumulator, { models: _models }) => {
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
            <Option value="total_view_count">{i18n.t('by_popularity')}</Option>
            <Option value="score">{i18n.t('by_score')}</Option>
            <Option value="publishedAt">{i18n.t('by_publish_time')}</Option>
            <Option value="length">{i18n.t('by_video_length')}</Option>
          </Select>
        </Col>
        <Col span={6}>
          <Select
            mode="multiple"
            placeholder={i18n.t('select_actress')}
            onChange={onModelsChange}
            style={{ width: '100%' }}
          >
            {models.map(model => (
              <Option key={model}>{model}</Option>
            ))}
          </Select>
        </Col>
      </Row>
    );
  }
}

Filter.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.object.isRequired,
  onModelsChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  data: [],
};

export default Filter;
