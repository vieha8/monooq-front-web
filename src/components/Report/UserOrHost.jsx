import React from 'react';
import styled from 'styled-components';
import Button from 'components/Shared/Button';
import { ContentContainer } from 'components/Page';
import { Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Content = styled.div`
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `}
`;

const ReportContainer = styled.div`
`;


const Title = styled.div`
  color: ${Colors.black};
  font-size: 30px;
  line-height: 45px;
  text-align: left;
  margin-bottom: 30px;
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const Information = props => {
  const ImageWrapper = styled.div`
    width: 100%;
    text-align: center;
  `;
  const IMAGE_SIZE = 100;
  const Image = styled.img`
    width: ${IMAGE_SIZE}px;
    height: ${IMAGE_SIZE}px;
    border-radius: ${IMAGE_SIZE / 2}px;
  `;

  const Name = styled.div`
    font-size: 24px;
    line-height: 36px;
    text-align: center;
  `;
  const Area = styled.div`
    font-size: 14px;
    line-height: 21px;
    text-align: center;
  `;

  return (
    <div className={props.className}>
      <ImageWrapper>
        <Image src="http://placehold.jp/150x150.png" alt={props.hostName} />
      </ImageWrapper>
      <Name>{props.hostName}</Name>
      <Area>{props.hostArea} 在住</Area>
    </div>
  );
};

const InformationWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

const StyledSelectContainer = styled.div`
  position: relative;
  display: inline-block;
  background: #fafafa;
  margin-right: 10px;
  width: 420px;
  ${media.phone`
    width: 100%;
  `};
  ::before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    background: inherit;
    height: 100%;
    width: 100%;
  }
  ::after {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    right: 9px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 6px 0 6px;
    border-color: #bcbcbc transparent transparent transparent;
  }
`;
const StyledSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0;
  margin: 0;
  height: 40px;
  width: 100%;
  color: #bcbcbc;
  background: transparent;
  position: relative;
  z-index: 1;
  padding: 10px 40px 10px 14px;
  border: 1px solid #bcbcbc;
  border-radius: 2px;
  &::-ms-expand {
    display: none;
  }
`;

const NoticeText = styled.div`
  font-size: 18px;
  line-height: 32px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

export default props => (
  <ContentContainer>
    <Content>
      <ReportContainer>
        <Title>対象のユーザー・ホスト</Title>
        <InformationWrapper>
          <Information
            hostName={props.hostName}
            hostArea={props.hostArea}
          />
        </InformationWrapper>
        <Title>違反・不適切と思われる内容</Title>
        <StyledSelectContainer>
          <StyledSelect>
            <option value={0}>選択してください</option>
            <option value={1}>個人情報の記載がある</option>
            <option value={2}>他サービスへの勧誘・誘導があった</option>
            <option value={3}>直接の取り引きや支払いを求められた</option>
            <option value={4}>違反・詐欺行為をしている</option>
            <option value={5}>過度な支払いや値下げを求められた</option>
            <option value={6}>その他</option>
          </StyledSelect>
        </StyledSelectContainer>
      </ReportContainer>
      <NoticeText>
        不適切な内容の報告に基づいて、モノオクカスタマーサポートでチェックし、随時ご対応させていただきます。報告頂いた内容に関しては返信等は行いませんのでご了承ください。
      </NoticeText>
      <ButtonWrapper>
        <Button fluid onClick={props.onClickSave}>送信する</Button>
      </ButtonWrapper>
    </Content>
  </ContentContainer>
);
