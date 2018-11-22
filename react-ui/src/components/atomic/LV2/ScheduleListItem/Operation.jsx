// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import Path from 'config/path';
import TextLink from 'components/atomic/LV1/TextLink';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  width: 100%;
  padding: ${Dimens.medium}px 0;
`;

const OperationContainer = styled.div`
  display: table;
  width: 100%;
  max-width: 165px;
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
  roomId: string,
  otherAction?: {
    text: string,
    href: string,
  },
};

export default (props: PropTypes) => (
  <Container>
    <OperationContainer float={props.float}>
      <Message>
        <TextLink to={Path.message(props.roomId)}>
          <InlineText.Base fontSize={`${FontSizes.medium}`} color={`${Colors.brandPrimary}`} bold>
            メッセージを見る
          </InlineText.Base>
        </TextLink>
      </Message>
      {props.otherAction && (
        <Other>
          <TextLink to={props.otherAction.href} fontSize={FontSizes.xsmall}>
            {props.otherAction.text}
          </TextLink>
        </Other>
      )}
    </OperationContainer>
  </Container>
);
