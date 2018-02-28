import styled from 'styled-components';
import { media } from 'helpers/style/media-query';

export const Page = styled.div`
  padding: 80px 10%;
  ${media.phone`
    padding: 80px 5% 100px 5%;
  `}
`;

export const Container = styled.div`
  width: 100%;
  &::after {
    clear: both;
    content: "";
    display: block;
  }
`;

export const PageContent = styled.div`
  width: 60%;
  float: left;
  ${media.phone`
    width: 100%;
    float: none;
    padding-bottom: 110px;
  `}
`;

export default {};
