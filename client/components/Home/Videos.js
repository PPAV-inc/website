import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Card, Button } from 'antd';
import styled from 'styled-components';

import VideosRow from '../shared/VideosRow';
import { Link } from '../../routes';

const FirstRow = styled(Row)`
  margin-bottom: 30px;
`;

class Videos extends Component {
  render() {
    const { title, data } = this.props;

    return (
      <Card
        title={<h3>{title}</h3>}
        bordered={false}
        extra={
          <Link route="/">
            <Button>更多...</Button>
          </Link>
        }
      >
        <FirstRow gutter={16} type="flex" justify="space-around">
          <VideosRow data={data.slice(0, 3)} colSpan={8} />
        </FirstRow>
        <Row gutter={16}>
          <VideosRow data={data.slice(3)} colSpan={8} />
        </Row>
      </Card>
    );
  }
}

Videos.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

Videos.defaultProps = {
  data: [],
  title: '',
};

export default Videos;
