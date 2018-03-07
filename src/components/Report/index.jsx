import React from 'react';
import styled from 'styled-components';
import Button from 'components/Shared/Button';
import { ContentContainer } from 'components/Page';
import { Colors, FontSizes, Dimens } from 'variables';
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
  const Title = styled.div`
    font-size: 18px;
    line-height: 32px;
    margin-bottom: 15px;
  `;
  const Wrapper = styled.div`
    display: flex;
  `;
  const Image = styled.img`
    width: 104px;
    height: 79px;
    object-fit: cover;
    margin-right: 20px;
  `;

  const Area = styled.div`
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 5px;
    color: #e85258;
  `;

  const Description = styled.div`
    font-size: 12px;
    line-height: 18px;
  `;

  return (
    <div className={props.className}>
      <Title>ホストは YUKI HASHIDA さん</Title>
      <Wrapper>
        <Image src="https://picsum.photos/150?image=42" />
        <div>
          <Area>東京都 港区 六本木</Area>
          <Description>
            東京タワーに近くて便利！大きい荷物も何人分でもOK何人分で荷物も何人分でもOK何人分で…
          </Description>
        </div>
      </Wrapper>
    </div>
  );
};

const InformationWrapper = styled.div`
  width: 360px;
`;

const StyledSelectContainer = styled.div`
  position: relative;
  display: inline-block;
  background: #fafafa;
  margin-right: 10px;
  ::before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    background: inherit;
    height: 100%;
    width: 40px;
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


export default props => (
  <ContentContainer>
    <Content>
      <ReportContainer>
        <Title>対象の場所</Title>
        <InformationWrapper>
          <Information />
        </InformationWrapper>
        <Title>違反・不適切と思われる内容</Title>
        <StyledSelectContainer>
          <StyledSelect>
            {["選択してください","内容"].map(item => {
              return <option>{item}</option>;
            })}
          </StyledSelect>
        </StyledSelectContainer>
      </ReportContainer>
      <ButtonWrapper>
        <Button fluid onClick={props.onClickSave}>送信する</Button>
      </ButtonWrapper>
    </Content>
  </ContentContainer>
);
