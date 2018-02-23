import React from 'react';
import styled from 'styled-components';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Title from '../shared/Title';
import Button from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import InputPriceOfType from '../price/InputPriceOfType';

export default () => (
  <Container>
    <PageContent>
      <Header
        header="料金目安を設定する"
        subHeader="あなたのスペースで荷物を預かる料金はいくら？"
      />
      <Title
        title="さまざまな相談にに対応出来るように、おおよその料金目安を設定しましょう！¥n人によって荷物量が違うので、あなたのスペース情報と自分の荷物を考えながらユーザーはあなたに相談するか検討してくれます。"
      />
      <div>
        <InputPriceOfType
          title="スペースまるごと"
          caption="あなたのスペースのほとんどを使用する荷物の場合の料金"
          placeholder="20000"
        />
        <InputPriceOfType
          title="スペース半分"
          caption="あなたのスペースの「半分」を使用する荷物の場合の料金"
          placeholder="10000"
        />
        <InputPriceOfType
          title="スペース1/4"
          caption="あなたのスペースの「4分の1」を使用する荷物の場合の料金"
          placeholder="5000"
        />
      </div>
      <Button border>戻る</Button>
      <Button position="right">登録を完了する</Button>
    </PageContent>
    <SideBar
      renderSaveContent={() => <SaveBox step={4} />}
      renderHintContent={() => (
        <HintBox
          title="料金設定に関するヒント"
          text="荷物が思っていたよりも大きかったなど、荷物が届いた後でも柔軟に対応できる料金設定をしましょう。"
        />
      )}
    />
  </Container>
);
