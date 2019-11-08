import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';

export const Section = styled.div`
  margin-top: ${props => props.marginTop || Dimens.medium2}px;
  ${media.phone`
    ${props =>
      props.marginTopSp &&
      `
        margin-top: ${props.marginTopSp}px;
      `};
  `};
`;

export default {};
