// @flow

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Height as HeaderHeight } from 'components/LV3/Header';

const Page = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 20px 80px;

  margin-top: 124px;
  ${media.tablet`
    margin-top: 80px;
  `};

  ${media.phone`
    padding: ${HeaderHeight - 10}px 15px 15px;

    ${props =>
      props.fillPhone &&
      `
        padding-left: 0;
        padding-right: 0;
      `}
  `};

  ${props =>
    props.smallMargin &&
    `
    padding: 20px 0 80px;
    margin-top: 0;
  `};

  ${media.phone`
    margin-top: 20px;
    ${props =>
      props.bottomButtonMargin &&
      `
      min-height: calc(100vh - 20px);
      position: relative;
      padding-bottom: ${props.bottomButtonMargin}px;
      box-sizing: border-box;
    `};
  `};
`;

export default Page;
