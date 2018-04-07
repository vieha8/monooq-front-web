// @flow

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Height as HeaderHeight } from 'components/atomic/organisms/Header';

const Page = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: ${HeaderHeight}px 0 80px;
  ${media.phone`
    padding: ${HeaderHeight}px 20px 40px;

    ${props => props.fillPhone && `
      padding-left: 0;
      padding-right: 0;
    `}
  `}
`;

export default Page;
