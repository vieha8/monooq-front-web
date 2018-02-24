import React from 'react';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Button from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import HowToReceive from '../receive/HowToReceive';
import ReceiveDetail from '../receive/ReceiveDetail';
import SaveBoxMobile from '../shared/SaveBoxMobile';
import HintBoxMobile from '../shared/HintBoxMobile';
import FloatHintButton from '../shared/FloatHintButton';

const hintProps = {
  title: '荷物受け取りのヒント',
  text: 'もし、あなたが車でお手伝いができるならアピールをしましょう。ユーザーに喜んでもらえますよ！',
};

export default () => (
  <Container>
    <PageContent>
      <Header
        header="荷物の受け取りについて"
        subHeader="どのように荷物を受け取りますか？"
      />
      <HowToReceive />
      <ReceiveDetail />
      <Button border>戻る</Button>
      <Button position="right">次へ</Button>
    </PageContent>
    <SideBar
      renderMainContent={() => <SaveBox step={3} />}
      renderHintContent={() => (
        <HintBox {...hintProps} />
      )}
    />
    <SaveBoxMobile />
    <FloatHintButton />
    <HintBoxMobile {...hintProps} />
  </Container>
);
