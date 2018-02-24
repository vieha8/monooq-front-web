import React from 'react';
import styled from 'styled-components';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Button, { ButtonsContainer } from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import SpaceSizeCriterion from '../price/SpaceSizeCriterion';
import SaveBoxMobile from '../shared/SaveBoxMobile';
import FloatHintButton from '../shared/FloatHintButton';

const hintProps = {
  title: '荷物受け取りのヒント',
  text: 'もし、あなたが車でお手伝いができるならアピールをしましょう。ユーザーに喜んでもらえますよ！',
};

const CriterionWrapper = styled.div`
  &::after {
    clear: both;
    content: "";
    display: block;
  }
`;

export default () => (
  <Container>
    <PageContent>
      <Header
        header="料金目安を設定する"
        subHeader="あなたのスペースはどちらの大きさですか？"
      />
      <CriterionWrapper>
        <SpaceSizeCriterion position="left" text="1人用ソファが入るくらい、またはそれ以下" />
        <SpaceSizeCriterion position="right" text="1人用引っ越しの荷物が入るくらい、またはそれ以上" />
      </CriterionWrapper>
      <ButtonsContainer>
        <Button border>戻る</Button>
        <Button position="right">次へ</Button>
      </ButtonsContainer>
    </PageContent>
    <SideBar
      renderMainContent={() => <SaveBox step={4} />}
      renderHintContent={() => (
        <HintBox {...hintProps} />
      )}
    />
    <SaveBoxMobile />
    <FloatHintButton {...hintProps} />
  </Container>
);
