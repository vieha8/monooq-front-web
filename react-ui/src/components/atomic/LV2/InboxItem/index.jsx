// @flow

import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import AvatarImage from 'components/atomic/LV1/AvatarImage';
import { Dimens, Colors, FontSizes } from 'variables';

const Container = styled.li`
  padding-top: ${Dimens.medium2}px;
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
`;

const Cell = styled.div`
  display: inline-block;
  vertical-align: middle;
  &:last-child {
    display: inline-block;
    margin: ${Dimens.medium}px auto;
  }
  ${props =>
    props.nametime &&
    `
    margin-left:15px;
    width: calc(100% - 48px);
    }
  `};
`;

export type PropTypes = {
  link: string,
  image: string,
  name: string,
  receivedAt: string | Date | moment,
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
      <Cell>
        <InlineText.Base>{props.lastMessage}</InlineText.Base>
      </Cell>
    </Link>
  </Container>
);
