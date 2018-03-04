import React from 'react';
import styled from 'styled-components';
import Button from 'components/Shared/Button';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  border-top: 1px solid ${Colors.borderGray};
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `}
`;

const PolicyContainer = styled.div`
  padding-bottom: ${Dimens.medium2}px;
`;

const Text = styled.span`
  font-size: ${FontSizes.medium}px;
  color: black;
`;

const TextWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const Policy = styled.a`
  font-size: ${FontSizes.medium}px;
  color: ${Colors.linkBlue};
  text-decoration: none;
  &:hover {
    color: ${Colors.linkBlue};    
  }
`;

const ButtonContainer = styled.div`
  border-top: 1px solid ${Colors.borderGray};
  padding: ${Dimens.medium2}px 30% 0;
  ${media.phone`
    padding: ${Dimens.medium2}px 20% 0;  
  `}
`;

export default props => (
  <Container>
    <PolicyContainer>
      <TextWrapper>
        <Text>キャンセルと返金に関して</Text>
      </TextWrapper>
      <TextWrapper>
        <Text>キャンセルする前に、</Text>
        <Policy href="/cancel_policy">キャンセルポリシー</Policy>
        <Text>をお読みください</Text>
      </TextWrapper>
    </PolicyContainer>
    <ButtonContainer>
      <Button
        fluid
        bgColor={Colors.white}
        fontColor={Colors.darkGray1}
        borderColor={Colors.darkGray1}
        onClick={props.onClickCancel}
      >
        キャンセルする
      </Button>
    </ButtonContainer>
  </Container>
);
