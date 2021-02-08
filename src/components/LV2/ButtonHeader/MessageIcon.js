import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';

const MessageIconUrl = 'https://monooq.imgix.net/img%2Fservice%2Ficon-message.svg?auto=compress';

const StyledLink = styled.a`
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

export default function MessageIcon({ href, onClick, messageCount }) {
  return (
    <Link href={href || ''} onClick={onClick} passHref>
      <StyledLink>
        <Image src={MessageIconUrl} messageCount={messageCount} alt="icon-chat" />
        {messageCount > 0 && <NoticeIcon />}
      </StyledLink>
    </Link>
  );
}
