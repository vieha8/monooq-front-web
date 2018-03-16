import React, { Fragment } from 'react';
import Path from 'config/path';

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Footer } from 'components/Shared';

const DefaultContainer = styled.div`
  padding: 0 116px;
  ${media.phone`
    padding: 0 8vw;
  `};
`;

const MainTitle = styled.div`
  font-size: 34px;
  line-height: 51px;
  margin-bottom: 44px;
  ${media.phone`
    font-size: 32px;
  `};
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 32px;
`;

const TextWrapper = styled.div`
  margin-bottom: 40px;
`;

export default () => (
  <Fragment>

    <Footer />
  </Fragment>
);
