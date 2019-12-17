import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { HeightPhone as HeaderHeight } from 'components/LV3/Header';

const Page = styled.div`
  width: 100%;
  max-width: ${props => (props.noMargin ? '100%' : '1440px')};
  margin: 0 auto;
  margin-top: 85px;
  padding: 20px 20px 80px;
  ${props =>
    props.noMargin &&
    `
    padding: 0 0 80px;
  `};

  ${media.tablet`
    margin-top: 80px;
    ${props =>
      props.noMargin &&
      `
      margin-top: 0px;
      padding: ${HeaderHeight}px 0px;
    `};
  `};

  ${media.phone`
    margin-top: 54px;
    padding: ${HeaderHeight - 10}px 15px 15px;
    ${props =>
      props.fillPhone &&
      `
        padding-left: 0;
        padding-right: 0;
      `}
    ${props =>
      props.noMargin &&
      `
      margin-top: 0px;
      padding: ${HeaderHeight}px 0px;
    `};
  `};
`;

export default Page;
