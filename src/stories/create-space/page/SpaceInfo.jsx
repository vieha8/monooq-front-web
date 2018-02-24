import React from 'react';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Button from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import ImageDrop from '../space/ImageDrop';
import InputTitle from '../space/InputTitle';
import SelectType from '../space/SelectType';
import InputIntro from '../space/InputIntro';
import InputAddress from '../space/InputAddress';
import SaveBoxMobile from '../shared/SaveBoxMobile';
import FloatHintButton from '../shared/FloatHintButton';

const hintProps = {
  title: 'スペース登録のヒント',
  text: 'ユーザーが自分の荷物が入るかイメージできるようにスペースの情報やアピールポイントを掲載しましょう！',
};

export default () => (
  <Container>
    <PageContent>
      <Header
        header="スペースを登録する"
        subHeader="どんなスペースを掲載しますか？"
      />
      <ImageDrop />
      <InputTitle />
      <SelectType />
      <InputIntro />
      <InputAddress />
      <Button>次へ</Button>
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
