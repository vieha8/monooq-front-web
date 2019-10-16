// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';
import MessageIcon from 'images/icon-message.png';

const StyledLink = styled(Link)`
  position: relative;
  display: inline-block;
`;

const Image = styled.img`
  width: ${Dimens.medium1}px;
  height: auto;
`;

const NoticeIcon = styled.span`
  content: '';
  position: absolute;
  top: 0px;
  right: 0px;
  width: ${Dimens.small}px;
  height: ${Dimens.small}px;
  background-color: ${Colors.brandPrimary};
  border-radius: ${Dimens.small}px;
`;

type PropTypes = {
  href?: string,
  onClick?: Function,
  messageCount?: number,
};

export default ({ href, onClick, messageCount }: PropTypes) => (
  <StyledLink to={href || ''} onClick={onClick}>
    <Image src={MessageIcon} messageCount={messageCount} alt="icon-chat" />
    {messageCount > 0 && <NoticeIcon />}
  </StyledLink>
);
