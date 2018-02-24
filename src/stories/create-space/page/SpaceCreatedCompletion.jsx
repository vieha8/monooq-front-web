import React from 'react';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Title from '../shared/Title';
import Button from '../shared/Button';
import SideBar from '../shared/SideBar';
import MySpaceRow from '../shared/MySpaceRow';

export default () => (
  <Container>
    <PageContent>
      <Header
        header="場所の登録が完了しました！"
      />
      <Title
        title="ユーザーからの相談を待ちましょう。安心してもらえるようにメッセージは素早い対応を心がけましょう！"
      />
      <Button fill>登録した場所を見る</Button>
    </PageContent>
    <SideBar
      renderMainContent={() => <MySpaceRow place="東京都" title="東京タワーにも近くて便利！大きい荷物も何人分でもOK大きい荷物も何人分でもOK大きい荷物も何人分でもOK大きい荷物も何人分でもOK" />}
    />
  </Container>
);
