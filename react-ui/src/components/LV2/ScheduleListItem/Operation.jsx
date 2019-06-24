// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/InlineText';
import Path from 'config/path';
import TextLink from 'components/LV1/TextLink';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  width: 100%;
  padding: ${Dimens.medium}px 0;
`;

const OperationContainer = styled.div`
  display: table;
  width: 100%;
  max-width: 164px;
  border: 2px solid ${Colors.brandPrimary};
  border-radius: 6px;
  padding: ${Dimens.small}px ${Dimens.medium}px;
  float: ${props => props.float || 'none'};
  text-align: center;
  ${media.phone`
    max-width: 100%;
    float: none;
  `};
`;

const Message = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Other = styled(Message)`
  text-align: right;
`;

type PropTypes = {
  float?: boolean,
  roomId: string,
  otherAction?: {
    text: string,
    href: string,
  },
};

export default ({ float, roomId, otherAction }: PropTypes) => (
  <Container>
    <OperationContainer float={float}>
      <Message>
        <TextLink to={Path.message(roomId)}>
          <InlineText.Base fontSize={`${FontSizes.medium}`} color={`${Colors.brandPrimary}`} bold>
            メッセージを見る
          </InlineText.Base>
        </TextLink>
      </Message>
      {otherAction && (
        <Other>
          <TextLink to={otherAction.href} fontSize={FontSizes.xsmall}>
            {otherAction.text}
          </TextLink>
        </Other>
      )}
    </OperationContainer>
  </Container>
);
