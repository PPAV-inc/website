import React, { Component } from 'react';
import { Layout, Row, Col, Icon, Divider } from 'antd';
import styled from 'styled-components';

import { Link } from '../../routes';

const { Footer: AntdFooter } = Layout;

const StyledFooter = styled(AntdFooter)`
  background-color: #fff;
`;

const StyledLi = styled.li`
  margin-bottom: 4px;

  :hover {
    text-decoration: underline !important;
  }
`;

const StyledUl = styled.ul`
  margin-top: 1.5em;
  margin-bottom: 1.5em;
`;

const CompanyName = styled.h2`
  font-weight: 700;
`;

class Footer extends Component {
  render() {
    return (
      <StyledFooter>
        <Divider />
        <Row type="flex" justify="center">
          <Col xs={6} md={6} xl={6}>
            <StyledUl>
              <StyledLi>
                <a
                  href="https://www.facebook.com/ppavbot/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon type="facebook" />
                  &nbsp;&nbsp;PPAV 粉絲專頁
                </a>
              </StyledLi>
              <StyledLi>
                <Link route="/bot">
                  <span>
                    <Icon type="mobile" />
                    &nbsp;&nbsp;Telegram 聊天機器人
                  </span>
                </Link>
              </StyledLi>
            </StyledUl>
          </Col>
          <Col xs={6} md={6} xl={6}>
            <StyledUl>
              <StyledLi>
                <Link route="/about">
                  <span>關於 PPAV</span>
                </Link>
              </StyledLi>
              <StyledLi>
                <Link route="/help">
                  <span>協助</span>
                </Link>
              </StyledLi>
              <StyledLi>
                <a
                  href="https://goo.gl/forms/RaLMY6LbFQaqqk7e2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  意見回饋
                </a>
              </StyledLi>
              <StyledLi>
                <a href="mailto:ppav2017@gmail.com">聯絡我們</a>
              </StyledLi>
            </StyledUl>
          </Col>
          <Col xs={6} md={6} xl={6}>
            <StyledUl>
              <StyledLi>
                <Link route="/terms-of-service">
                  <span>使用條款</span>
                </Link>
              </StyledLi>
              <StyledLi>
                <Link route="/privacy">
                  <span>隱私政策</span>
                </Link>
              </StyledLi>
              <StyledLi>
                <Link route="/sitemap">
                  <span>網站地圖</span>
                </Link>
              </StyledLi>
            </StyledUl>
          </Col>
        </Row>
        <Divider />
        <Row type="flex" justify="center">
          <Col span={24} style={{ textAlign: 'center' }}>
            <CompanyName>PPAV</CompanyName>
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            <div style={{ color: '#9ba2a6' }}>
              <Icon type="copyright" /> PPAV <Divider type="vertical" />{' '}
              版權所有
            </div>
          </Col>
        </Row>
      </StyledFooter>
    );
  }
}

export default Footer;
