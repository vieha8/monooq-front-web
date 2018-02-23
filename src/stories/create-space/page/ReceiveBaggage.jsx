import React from 'react';
import styled from 'styled-components';
import Header from '../shared/Header';
import Button from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import HowToReceive from '../receive/HowToReceive';
import ReceiveDetail from '../receive/ReceiveDetail';

const Container = styled.div`
  &::after {
    clear: both;
    content: "";
    display: block;
  }
`;

const PageContent = styled.div`
  float: left;
`;

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
      renderSaveContent={() => <SaveBox step={3} />}
      renderHintContent={() => (
        <HintBox
          title="荷物受け取りのヒント"
          text="もし、あなたが車でお手伝いができるならアピールをしましょう。ユーザーに喜んでもらえますよ！"
        />
      )}
    />
  </Container>
);
