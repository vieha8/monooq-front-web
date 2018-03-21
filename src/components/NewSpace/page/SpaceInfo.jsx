import React from 'react';
import FloatHintButton from 'containers/NewSpace/FloatHintButton';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Button, { ButtonsContainer } from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import ImageDrop from '../space/ImageDrop';
import InputTitle from '../space/InputTitle';
import SelectType from '../space/SelectType';
import InputIntro from '../space/InputIntro';
import InputAddress from '../space/InputAddress';
import SaveBoxMobile from '../shared/SaveBoxMobile';

const hintProps = {
  title: 'スペース登録のヒント',
  text: 'ユーザーが自分の荷物が入るかイメージできるようにスペースの情報やアピールポイントを掲載しましょう！',
};

export default (props) => {
  const header = (props.ui.isEdit) ? '編集' : '登録';

  return (
    <Container>
      <PageContent>
        <Header
          header={`スペースを${header}する`}
          subHeader="どんなスペースを掲載しますか？"
        />
        <ImageDrop {...props} onClickImageDelete={props.onClickImageDelete} />
        <InputTitle {...props} handleChangeText={props.handleChangeTitle} />
        <SelectType {...props} handleChangeSelect={props.handleChangeSpaceType} />
        <InputIntro {...props} handleChangeText={props.handleChangeIntroduction} />
        <InputAddress {...props} handleChangeText={props.handleChangeAddress} />
        <ButtonsContainer>
          <Button onClick={props.onClickNext} disabled={props.buttonDisabled}>
            次へ
          </Button>
        </ButtonsContainer>
      </PageContent>
      <SideBar
        renderMainContent={() => <SaveBox step={1} />}
        renderHintContent={() => (
          <HintBox {...hintProps} />
        )}
      />
      <SaveBoxMobile />
      <FloatHintButton {...hintProps} />
    </Container>
  );
};
