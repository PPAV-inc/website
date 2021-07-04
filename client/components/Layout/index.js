import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Layout } from 'antd';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  width: 100% !important;
  margin: 0 !important;
  background-color: #fff !important;
  font-family: 'Hiragino Sans GB', 'Helvetica Neue', Helvetica,
    'STHeitiSC-Light', 'Microsoft YaHei', '微軟雅黑', Arial, sans-serif !important;

  * {
    font-family: inherit;
  }
  a {
    color: #484848 !important;
    text-decoration: none !important;
  }
  input,
  button {
    outline: none !important;
  }
  ul {
    list-style: none !important;
  }
`;

const CustomLayout = ({ children, title, page, headerValue }) => (
  <div>
    <Head>
      <title>{title}</title>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/antd/3.0.0/antd.min.css"
      />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-107147708-1"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-107147708-1');
          `,
        }}
      />
    </Head>

    <StyledLayout>
      <Header shouldShow={page === 'search'} value={headerValue} />
      <Content>{children}</Content>
      <Footer />
    </StyledLayout>
  </div>
);

CustomLayout.propTypes = {
  children: PropTypes.element.isRequired,
  headerValue: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  title: PropTypes.string,
};

CustomLayout.defaultProps = {
  title: 'PPAV',
};

export default CustomLayout;
