import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { media, mediaMin } from 'helpers/style/media-query';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';
import InlineText from 'components/LV1/Texts/InlineText';
import { Dimens, Colors, FontSizes } from 'variables';
import LazyLoad from 'react-lazyload';
import { formatDate, formatStringSlash } from 'helpers/date';
import { formatName } from 'helpers/string';

const Wrap = styled.li`
  padding: ${Dimens.medium1}px 5px ${Dimens.medium}px;
  border-bottom: 1px solid ${Colors.borderGray};
  &:active {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
  }
  a {
    display: block;
    width: 100%;
  }
  list-style: none;
  ${media.phone`
    padding: ${Dimens.small_10}px 5px;
  `};
  &:first-child {
    ${media.phone`
      padding: ${Dimens.medium2}px 5px ${Dimens.small_10}px;
    `};
  }
  ${mediaMin.tablet`
    &:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.1);
    }
  `};
`;

const Cell = styled.div`
  display: inline-block;
  vertical-align: middle;
  &:last-child {
    display: inline-block;
    margin: ${Dimens.xsmall}px auto 0px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  ${props =>
    props.nametime &&
    `
    margin-left:15px;
    width: calc(100% - 48px);
  `};
`;

const FirstLine = styled.div`
  display: flex;
  align-items: center;
`;
const MessageDateWrap = styled.div`
  flex: 0 0 52px;
`;
const UserNameWrap = styled.div`
  flex: 1;
  padding: 0 ${Dimens.xxsmall_4}px 0 ${Dimens.medium}px;
`;
const UserImageWrap = styled.div`
  flex: 0 0 32px;
`;

export default ({ link, image, name, receivedAt, lastMessage, isRead }) => (
  <Wrap>
    <Link href={link || ''}>
      <a>
        <FirstLine nametime>
          <UserImageWrap>
            <LazyLoad width={32}>
              <ImageAvatar size={32} src={image} />
            </LazyLoad>
          </UserImageWrap>
          <UserNameWrap>
            <InlineText.Base inLineBlock bold fontSizeSp={`${FontSizes.small}`}>
              {formatName(name)}
            </InlineText.Base>
          </UserNameWrap>
          <MessageDateWrap>
            <InlineText.Base fontSize={`${FontSizes.small_12}`} color={Colors.lightGray1}>
              {formatDate(new Date(receivedAt), formatStringSlash)}
            </InlineText.Base>
          </MessageDateWrap>
        </FirstLine>
        <Cell lastMessage nametime>
          <InlineText.Base fontSize={15} fontSizeSp={12} whiteSpaceNormal>
            {lastMessage}
          </InlineText.Base>
          <InlineText.Base
            inLineBlock
            verticalMiddle
            fontSize={`${FontSizes.small_12}`}
            color={Colors.brandPrimary}
            float="right"
          >
            {!isRead && '●'}
          </InlineText.Base>
        </Cell>
      </a>
    </Link>
  </Wrap>
);
