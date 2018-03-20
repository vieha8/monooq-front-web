import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const DefaultContainer = styled.div`
  width: ${Dimens.fixedWidthPc}px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: initial;
  ${media.phone`
    padding: 0 8vw;
    width: 84vw;
  `};
`;

export default DefaultContainer;
