import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

const LeftWrap = styled.div`
  width: 100%;
  max-width: 660px;
  padding-right: ${Dimens.medium4_50}px;
  margin: auto;
  ${props =>
    props.confirm &&
    `
    margin: auto;
    padding-right: 0;
  `};
  ${media.tablet`
    padding-right: 0;
  `};
`;

export default LeftWrap;
