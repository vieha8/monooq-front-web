import React from 'react';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Button from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import InputAboutBaggage from '../baggage/InputAboutBaggage';

export default () => (
  <Container>
    <PageContent>
      <Header
        header="預かる荷物について"
        subHeader="あなたのスペースでどんな荷物を預かりますか？"
      />
      <InputAboutBaggage />
      <Button border>戻る</Button>
      <Button position="right">次へ</Button>
    </PageContent>
    <SideBar
      renderMainContent={() => <SaveBox step={2} />}
      renderHintContent={() => (
        <HintBox
          title="荷物情報のヒント"
          text="ユーザーには大きな荷物を預けられるスペースが人気です。あなたのスペースでも無理のない保管ができる内容を記載しましょう。"
        />
      )}
    />
  </Container>
);
