import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

// TODO Deprecated

const ContainerDefault = styled.div`
  width: auto;
  max-width: ${Dimens.fixedWidthPc}px;
  margin: 0 auto;
  padding: 0 ${Dimens.medium}px;
  box-sizing: initial;
  ${media.phone`
    width: 92vw;
    padding: 0px 4vw;
  `};
`;

export default ContainerDefault;
