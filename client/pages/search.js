import React from 'react';

import withData from '../lib/withData';
import Layout from '../components/Layout';
import Search from '../components/Search';

export default withData(props => (
  <Layout page="search" headerValue={decodeURI(props.url.query.keyword)}>
    <Search {...props} />
  </Layout>
));
