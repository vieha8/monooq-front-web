import React from 'react';
import styled from 'styled-components';
import { ImageDrop, InputTitle, SelectType, InputIntro, InputAddress, Button, SideBar, SaveBox, HintBox } from '../index';

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
      <ImageDrop />
      <InputTitle />
      <SelectType />
      <InputIntro />
      <InputAddress />
      <Button>次へ</Button>
    </PageContent>
    <SideBar
      renderSaveContent={() => <SaveBox />}
      renderHintContent={() => (
        <HintBox
          title="スペース登録のヒント"
          text="ユーザーが自分の荷物が入るかイメージできるようにスペースの情報やアピールポイントを掲載しましょう！"
        />
      )}
    />
  </Container>
);
