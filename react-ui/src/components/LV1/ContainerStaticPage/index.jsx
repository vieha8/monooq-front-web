import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  margin: ${Dimens.huge}px auto 0;
  ${media.tablet`
    margin: 0 auto;
  `};
  ${props =>
    !props.maxWidth &&
    `
      max-width: 768px;
    `}
`;

export default Container;
