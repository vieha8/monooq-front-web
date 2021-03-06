import React from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import InlineText from 'components/LV1/Texts/InlineText';
import TextLink from 'components/LV1/Texts/TextLink';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Wrap = styled.div`
  width: 100%;
  padding: ${Dimens.medium}px 0;
`;

const OperationWrap = styled.div`
  display: table;
  width: 100%;
  max-width: 164px;
  border: 2px solid ${Colors.brandPrimary};
  border-radius: 4px;
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

export default ({ float, roomId, otherAction }) => (
  <Wrap>
    <OperationWrap float={float}>
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
    </OperationWrap>
  </Wrap>
);
