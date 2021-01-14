import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

const Page = styled.div`
  width: 100%;
  max-width: ${props => (props.noMargin ? '100%' : '1440px')};
  margin: 0 auto;
  margin-top: ${Dimens.headerHeight}px;
  padding: 20px 20px 80px;
  ${props =>
    props.noMargin &&
    `
    padding: 0 0 80px;
  `};

  ${media.tablet`
    ${props =>
      props.noMargin &&
      `
      margin-top: 0;
      padding: 0;
    `};
  `};

  ${media.phone`
    padding: 15px;
    ${props =>
      props.fillPhone &&
      `
        padding-left: 0;
        padding-right: 0;
      `}
    ${props =>
      props.noMargin &&
      `
      margin-top: 0;
      padding: 0;
    `};
  `};
`;

export default Page;
