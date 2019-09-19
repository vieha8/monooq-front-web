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
    width: 100%;
    padding: 0px;
  `};
`;

export default ContainerDefault;
