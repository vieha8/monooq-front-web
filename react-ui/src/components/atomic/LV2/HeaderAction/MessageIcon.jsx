// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MessageIcon } from 'components/atomic/LV1/ActionIcon';
import NotificationCount from 'components/atomic/LV1/NotificationCount';

const LinkWrapper = styled(Link)`
  display: inline-block;
  position: relative;
`;

const CountWrapper = styled.span`
  position: absolute;
  top: 0;
  right: -4px;
`;

type PropTypes = {
  to?: string,
  onClick?: Function,
  notificationCount: number,
  color?: string,
};

export default (props: PropTypes) => (
  <LinkWrapper to={props.to} onClick={props.onClick}>
    <MessageIcon color={props.color} fontSize={24} />
    {props.notificationCount > 0 && (
      <CountWrapper>
        <NotificationCount count={props.notificationCount} fontSize={12} />
      </CountWrapper>
    )}
  </LinkWrapper>
);
