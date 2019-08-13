// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';
import ChatIcon from 'images/icon-chat.svg';

const StyledLink = styled(Link)`
  position: relative;
  margin-right: ${Dimens.small2}px;
  display: inline-block;
`;

const Image = styled.img`
  width: ${Dimens.medium2_35}px;
  height: auto;
`;

const NoticeIcon = styled.span`
  content: '';
  position: absolute;
  top: 2px;
  right: 2px;
  width: ${Dimens.small2}px;
  height: ${Dimens.small2}px;
  background-color: ${Colors.brandPrimary};
  border-radius: ${Dimens.small2}px;
`;

type PropTypes = {
  href?: string,
  onClick?: Function,
  messageCount?: number,
};

export default ({ href, onClick, messageCount }: PropTypes) => (
  <StyledLink to={href} onClick={onClick}>
    <Image src={ChatIcon} messageCount={messageCount} alt="icon-chat" />
    {messageCount > 0 && <NoticeIcon />}
  </StyledLink>
);
