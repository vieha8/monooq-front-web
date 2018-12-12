import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

// TODO Deprecated

const DefaultContainer = styled.div`
  width: 100%;
  max-width: ${Dimens.fixedWidthPc}px;
  margin: 0 auto;
  padding: 0 ${Dimens.medium}px;
  ${media.phone`
    padding: 0 ${Dimens.small_15}px;
  `};
`;

export default DefaultContainer;
