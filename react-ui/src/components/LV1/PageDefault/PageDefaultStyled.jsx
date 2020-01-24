import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import PageDefault from './index';

const PageDefaultStyled = styled(PageDefault)`
  padding-top: ${Dimens.large4_80}px;
  padding-bottom: ${Dimens.large4_80}px;
  color: ${Colors.darkGray1};
  ${media.phone`
    padding-top: ${Dimens.medium3_40}px;
    padding-bottom: ${Dimens.medium3_40}px;
  `};
`;

export default PageDefaultStyled;
