import React from 'react';

import withData from '../lib/withData';
import Layout from '../components/Layout';
import Home from '../components/Home';

export default withData((props) => (
  <Layout page="home" headerValue="">
    <Home {...props} />
  </Layout>
));
