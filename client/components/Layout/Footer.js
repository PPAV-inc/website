import React, { Component } from 'react';
import { Layout, Row, Col, Icon, Divider } from 'antd';
import styled from 'styled-components';

import { Link } from '../../routes';
import i18n from '../../lib/i18n';

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
                  &nbsp;&nbsp;{i18n.t('fb_page')}
                </a>
              </StyledLi>
              <StyledLi>
                <Link route="/bot">
                  <span>
                    <Icon type="mobile" />
                    &nbsp;&nbsp;{i18n.t('telegram_bot')}
                  </span>
                </Link>
              </StyledLi>
            </StyledUl>
          </Col>
          <Col xs={6} md={6} xl={6}>
            <StyledUl>
              <StyledLi>
                <Link route="/about">
                  <span>{i18n.t('about')}</span>
                </Link>
              </StyledLi>
              <StyledLi>
                <Link route="/help">
                  <span>{i18n.t('help')}</span>
                </Link>
              </StyledLi>
              <StyledLi>
                <a
                  href="https://goo.gl/forms/RaLMY6LbFQaqqk7e2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {i18n.t('feedback')}
                </a>
              </StyledLi>
              <StyledLi>
                <a href="mailto:ppav2017@gmail.com">{i18n.t('contact_us')}</a>
              </StyledLi>
            </StyledUl>
          </Col>
          <Col xs={6} md={6} xl={6}>
            <StyledUl>
              <StyledLi>
                <Link route="/terms-of-service">
                  <span>{i18n.t('terms_of_use')}</span>
                </Link>
              </StyledLi>
              <StyledLi>
                <Link route="/privacy">
                  <span>{i18n.t('privacy_policy')}</span>
                </Link>
              </StyledLi>
              <StyledLi>
                <Link route="/sitemap">
                  <span>{i18n.t('site_map')}</span>
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
              {i18n.t('copyright')}
            </div>
          </Col>
        </Row>
      </StyledFooter>
    );
  }
}

export default Footer;
