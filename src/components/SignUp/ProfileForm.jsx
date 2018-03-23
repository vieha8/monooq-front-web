import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import Icon from 'components/Shared/Icon';
import { Input, Form, TextArea, Select } from 'semantic-ui-react';
import Button from 'components/Shared/Button';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ErrorText from 'components/Shared/ErrorText';
import { selectOptionPrefectures } from 'helpers/prefectures';

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
  line-height: 1.5;
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

const showImagePreview = (props) => {
  // TODO 表示は仮なのでデザイン反映する
  if (props.image) {
    const { image } = props;
    return (
      <div>
        <img alt="preview" src={image.preview} width="100" />
      </div>
    );
  }

  return null;
};

export default props => (
  <Container>
    <Title>あなたのプロフィールを登録</Title>
    <Content>
      <Label>プロフィール写真</Label>
      <Dropzone
        style={styles.dnd}
        accept="image/jpeg, image/png"
        onDrop={data => props.handleChangeProfileImage(data[0])}
      >
        <DndContent>
          {props.image ? showImagePreview(props) : (
            <IconWrapper>
              <Icon name="far fa-image" size={64} fontSize={64} color={Colors.darkGray2} />
            </IconWrapper>
          )}
          <CaptionText>写真を登録する</CaptionText>
        </DndContent>
      </Dropzone>
      <InputContainer>
        <Label>お名前</Label>
        <Input
          fluid
          name="name"
          placeholder="ニックネームでも可"
          onChange={(_, e) => props.handleChangeName(e.value)}
        />
      </InputContainer>
      {props.errors.name && <ErrorText errors={props.errors.name} />}
      <InputContainer>
        <Label>お住いの地域</Label>
        <Select
          placeholder="選択してください"
          style={{ width: '100%' }}
          options={selectOptionPrefectures()}
          name="prefCode"
          onChange={(_, e) => props.handleChangePrefCode(e.value)}
        />
      </InputContainer>
      {props.errors.prefCode && <ErrorText errors={props.errors.prefCode} />}
      <InputContainer>
        <Label>あなたの紹介文</Label>
        <CaptionText>ユーザー・ホストが安心するようにあなたの紹介文を掲載しましょう！</CaptionText>
        <Form>
          <TextArea
            name="profile"
            placeholder="例）はじめまして！モノオクホストのYUKIです。大きめの荷物でも柔軟に対応しております。いつでもチャットでご連絡くださいください！"
            onChange={(_, e) => props.handleChangeProfile(e.value)}
            rows={4}
          />
        </Form>
      </InputContainer>
      {props.errors.profile && <ErrorText errors={props.errors.profile} />}
      <ButtonWrapper>
        <Button
          onClick={props.onClickRegisterProfile}
          disabled={props.buttonDisabled}
        >
          プロフィールを登録する
        </Button>
      </ButtonWrapper>
    </Content>
  </Container>
);
