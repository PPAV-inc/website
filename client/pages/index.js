import React from 'react';

import withData from '../lib/withData';
import Layout from '../components/Layout';
import Home from '../components/Home';

const Body = withData(props => (
  <Layout>
    <Home url={props.url} />
  </Layout>
));

export default props => <Body {...props} />;
