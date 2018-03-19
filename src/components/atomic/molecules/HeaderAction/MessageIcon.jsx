// @flow

import React from 'react';
import styled from 'styled-components';
import { MessageIcon } from 'components/atomic/atoms/ActionIcon';
import NotificationCount from 'components/atomic/atoms/NotificationCount';

const LinkWrapper = styled.a`
  display: inline-block;
  position: relative;
`;

const CountWrapper = styled.span`
  position: absolute;
  top: 0;
  right: -4px;
`;

type PropTypes = {
  href?: string,
  onClick?: Function,
  notificationCount: number,
  color?: string,
}

export default (props: PropTypes) => (
  <LinkWrapper href={props.href} onClick={props.onClick}>
    <MessageIcon color={props.color} fontSize={22} />
    {props.notificationCount > 0 &&
      <CountWrapper>
        <NotificationCount
          count={props.notificationCount}
          fontSize={12}
        />
      </CountWrapper>
    }
  </LinkWrapper>
);
