import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const Home = props => (
  <div>
    <p>Hello World path: {props.url.pathname}</p>
    <Button type="primary">Primary</Button>
  </div>
);

Home.propTypes = {
  url: PropTypes.object.isRequired,
};

export default Home;
