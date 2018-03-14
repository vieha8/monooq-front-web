import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Path from 'config/path';

import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import { Footer } from 'components/Shared';

const MaintenancePage = styled.div`
  background: #F05356;
  height: 100%;
  padding-top: 150px;
  color: #fff;
`;

const MobileContainer = styled.div`
  ${media.phone`
    padding-right: 8vw;
    padding-left: 8vw;
  `};
`;

const MainTitleContainer = MobileContainer.extend`
  margin-bottom: 50px;
`;

const MainTitle = styled.div`
  font-size: 32px;
  line-height: 48px;
  text-align: center;
`;

const LogoContainer = MobileContainer.extend`
  text-align: center;
  margin-bottom: 45px;
`;

const CopyText = styled.div`
  font-size: 18px;
  line-height: 48px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const MessageContainer = MobileContainer.extend`
  text-align: center;
  margin-bottom: 216px;
`;

const MessageText = styled.div`
  font-size: 18px;
  line-height: 36px;
`;

const Anchor = styled.a`
  color: inherit;
  text-decoration: underline;
  :hover {
    color: #eee;
    text-decoration: underline;
  }
`;

export default props => (
  <MaintenancePage>
    <MainTitleContainer>
      <MainTitle>新しいモノオクの誕生です！</MainTitle>
    </MainTitleContainer>

    <LogoContainer>
      <CopyText>個人間の物置きシェアサービス</CopyText>
      <img src="http://placehold.jp/270x60.png" />
    </LogoContainer>

    <MessageContainer>
      <MessageText>
        ただいまサービスのリニューアルを行っております。<br />
        ご不便をおかけいたしますが、もうしばらくお待ちくださいませ。<br />
        リニューアルの完了予定は3月15日午前10時です。<br /><br />
        お困りのご用件は<Anchor href="mailto:info@monooq.com">info@monooq.com</Anchor>までご連絡ください。
      </MessageText>
    </MessageContainer>
  </MaintenancePage>
);
