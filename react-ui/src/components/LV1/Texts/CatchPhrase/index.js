import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';

const CatchPhrase = styled.h1`
  margin: ${Dimens.small_10}px auto ${Dimens.medium2_34}px;
  color: ${Colors.black2};
  font-size: ${FontSizes.xxxlarge}px;
  line-height: ${Dimens.large2_71}px;
  font-weight: bold;
  text-align: center;
  ${media.phone`
    width: 100%;
    height: auto;
    margin: ${Dimens.small_10}px auto ${Dimens.medium_20}px;
    font-size: ${FontSizes.medium3}px;
    line-height: ${Dimens.medium2_36}px;
    font-weight: 900;
  `};
`;

export default CatchPhrase;
