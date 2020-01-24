import styled from 'styled-components';
import { Dimens } from 'variables';

// TODO Deprecated

const PageDefault = styled.div`
  width: auto;
  max-width: ${Dimens.fixedWidthPc}px;
  margin: 0 auto;
  padding: 0 ${Dimens.medium}px;
  box-sizing: initial;
`;

export default PageDefault;
