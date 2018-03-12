import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import Icon from 'components/Shared/Icon';
import { Input, Form, TextArea } from 'semantic-ui-react';
import Button from 'components/Shared/Button';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  background: ${Colors.white};
  margin: 0 auto;
  width: 420px;
  margin-top: ${Dimens.large}px;
  padding: ${Dimens.large}px;
  border-radius: 6px;
  text-align: center;
  ${media.phone`
    width: 90%;
    margin-top: ${Dimens.medium}px;
    padding: ${Dimens.large}px ${Dimens.medium}px;
  `}
`;

const Title = styled.div`
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium2}px;
`;

const Content = styled.div`
  margin-top: ${Dimens.large}px;
`;

const Label = styled.div`
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium}px;
  padding: ${Dimens.medium}px 0;
  text-align: left;
`;

const InputContainer = styled.div`
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const CaptionText = styled.div`
  margin-bottom: ${Dimens.medium}px;
  font-size: ${FontSizes.xsmall}px;
  color: ${Colors.darkGray1};
  text-align: left;
  line-height: 1.6;
`;

const DndContent = styled.div`
  text-align: center;
`;

const IconWrapper = styled.span`
  display: inline-block;
  color: ${Colors.darkGray2};
`;

const styles = {
  dnd: {
    width: '100%',
  },
};

export default props => (
  <Container>
    <Title>あなたのプロフィールを登録</Title>
    <Content>
      <Label>プロフィール写真</Label>
      <Dropzone
        style={styles.dnd}
        accept="image/jpeg, image/png"
        onDrop={(accepted, rejected) => { console.log({ accepted, rejected }); }}
      >
        <DndContent>
          <IconWrapper>
            <Icon name="image" size={64} fontSize={64} color={Colors.darkGray2} />
          </IconWrapper>
          <CaptionText>写真を登録する</CaptionText>
        </DndContent>
      </Dropzone>
      <InputContainer>
        <Label>お名前</Label>
        <Input
          fluid
          placeholder="ニックネームでも可"
          value={props.name}
          onChange={props.handleChangeName}
        />
      </InputContainer>
      <InputContainer>
        <Label>お住いの地域</Label>
        <Input
          fluid
          placeholder="東京都"
          value={props.address}
          onChange={props.handleChangeAddress}
        />
      </InputContainer>
      <InputContainer>
        <Label>あなたの紹介文</Label>
        <CaptionText>ユーザー・ホストが安心するようにあなたの紹介文を掲載しましょう！</CaptionText>
        <Form>
          <TextArea
            fluid
            placeholder="例）はじめまして！モノオクホストのYUKIです。大きめの荷物でも柔軟に対応しております。いつでもチャットでご連絡くださいください！"
            value={props.introduction}
            onChange={props.handleChangeIntroduction}
            rows={4}
          />
        </Form>
      </InputContainer>
      <ButtonWrapper>
        <Button
          bgColor={Colors.brandPrimary}
          onClick={props.onClickRegisterProfile}
          fluid
        >
          プロフィールを登録する
        </Button>
      </ButtonWrapper>
    </Content>
  </Container>
);
