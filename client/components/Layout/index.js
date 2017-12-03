import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Layout } from 'antd';

import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

const CustomLayout = ({ children, title }) => (
  <main>
    <Head>
      <title>{title}</title>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/antd/2.9.3/antd.min.css"
      />
    </Head>

    <Layout>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  </main>
);

CustomLayout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};

CustomLayout.defaultProps = {
  title: 'PPAV',
};

export default CustomLayout;
