import React from 'react';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Button from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import InputPriceOfAll from '../price/InputPriceOfAll';

export default () => (
  <Container>
    <PageContent>
      <Header
        header="料金目安を設定する"
        subHeader="あなたのスペースで荷物を預かる料金はいくら？"
      />
      <InputPriceOfAll />
      <Button border>戻る</Button>
      <Button position="right">登録を完了する</Button>
    </PageContent>
    <SideBar
      renderMainContent={() => <SaveBox step={4} />}
      renderHintContent={() => (
        <HintBox
          title="料金設定に関するヒント"
          text="荷物が思っていたよりも大きかったなど、荷物が届いた後でも柔軟に対応できる料金設定をしましょう。"
        />
      )}
    />
  </Container>
);
