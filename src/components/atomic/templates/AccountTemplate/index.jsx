// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Colors } from 'variables';

const Page = styled.div`
  background: ${Colors.yellow};
  padding: 80px 0;
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const Container = styled.div`
  width: 420px;
  margin: 0 auto;
  ${media.tablet`
    width: 320px;
  `}
`;

type PropTypes = {
  header: React.Element<*>,
  form: React.Element<*>,
}

export default (props: PropTypes) => (
  <Page>
    <HeaderContainer>
      {props.header}
    </HeaderContainer>
    <Container>
      {props.form}
    </Container>
  </Page>
);
