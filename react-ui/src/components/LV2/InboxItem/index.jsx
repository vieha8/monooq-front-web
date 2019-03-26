// @flow

import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/LV1/InlineText';
import AvatarImage from 'components/LV1/AvatarImage';
import { Dimens, Colors, FontSizes } from 'variables';

const Container = styled.li`
  padding: ${Dimens.medium1}px 5px ${Dimens.medium}px;
  border-bottom: 1px solid ${Colors.borderGray};
  &:hover {
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

export type PropTypes = {
  link: string,
  image: string,
  name: string,
  receivedAt: string | Date | moment,
  isRead: boolean,
};

export default (props: PropTypes) => (
  <Container>
    <Link to={props.link || ''}>
      <Cell>
        <AvatarImage size={32} src={props.image} />
      </Cell>
      <Cell nametime>
        <InlineText.Base
          maxWidthSp={150}
          lineheight={3}
          inLineBlock
          verticalMiddle
          bold
          fontSizeSp={`${FontSizes.small}`}
        >
          {props.name}
        </InlineText.Base>
        <InlineText.Base
          lineheight={3.5}
          inLineBlock
          verticalMiddle
          fontSize={`${FontSizes.small_12}`}
          color={Colors.lightGray1}
          float="right"
        >
          {moment(props.receivedAt).format('YYYY年MM月DD日')}
        </InlineText.Base>
      </Cell>
      <Cell lastMessage nametime>
        <InlineText.Base fontSize={15} fontSizeSp={12} whiteSpaceNormal>
          {props.lastMessage}
        </InlineText.Base>
        <InlineText.Base
          inLineBlock
          verticalMiddle
          fontSize={`${FontSizes.small_12}`}
          color={Colors.brandPrimary}
          float="right"
        >
          {!props.isRead && '●'}
        </InlineText.Base>
      </Cell>
    </Link>
  </Container>
);
