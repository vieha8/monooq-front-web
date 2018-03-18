import React from 'react';

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens } from 'variables';

import Logo from 'components/atoms/Logo';

const MaintenancePage = styled.div`
  background: ${Colors.brandPrimary};
  height: 100%;
  width: ${Dimens.fixedWidthPc};
  padding: 120px 0;
  color: ${Colors.white};
  ${media.phone`
    min-height: 100vh;
    width: 100vw;
    padding: 40px 0;
  `};
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
  margin-bottom: 10px;
`;

const MessageContainer = MobileContainer.extend`
  text-align: center;
  font-size: 18px;
  line-height: 36px;
`;

const MessageText = styled.div`
  ${media.phone`
    margin-bottom: 30px;
    & br {
      display: none;
    }
  `};
`;

const ContactText = styled.div`
  & br {
    display: none;
  }
  ${media.phone`
    & br {
      display: inline;
    }
  `};
`;

const Anchor = styled.a`
  color: inherit;
  text-decoration: underline;
  :hover {
    color: ${Colors.linkBlue};
    text-decoration: underline;
  }
`;

export default () => (
  <MaintenancePage>
    <MainTitleContainer>
      <MainTitle>新しいモノオクの誕生です！</MainTitle>
    </MainTitleContainer>

    <LogoContainer>
      <CopyText>個人間の物置きシェアサービス</CopyText>
      <Logo.BaseWhite />
    </LogoContainer>

    <MessageContainer>
      <MessageText>
        ただいまサービスのリニューアルを行っております。<br />
        ご不便をおかけいたしますが、もうしばらくお待ちくださいませ。<br />
        リニューアルの完了予定は3月26日午後3時です。<br /><br />
      </MessageText>
      <ContactText>
        お困りのご用件は <br />
        <Anchor href="mailto:info@monooq.com">info@monooq.com</Anchor> <br />
        までご連絡ください。
      </ContactText>
    </MessageContainer>
  </MaintenancePage>
);
