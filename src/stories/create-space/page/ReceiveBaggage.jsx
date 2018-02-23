import React from 'react';
import styled from 'styled-components';
import Button from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import ImageDrop from '../space/ImageDrop';
import InputTitle from '../space/InputTitle';
import SelectType from '../space/SelectType';
import InputIntro from '../space/InputIntro';
import InputAddress from '../space/InputAddress';

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
          title="荷物受け取りのヒント"
          text="もし、あなたが車でお手伝いができるならアピールをしましょう。ユーザーに喜んでもらえますよ！"
        />
      )}
    />
  </Container>
);
