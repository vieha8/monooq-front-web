import React from 'react';
import styled from 'styled-components';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Button from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import SpaceSizeCriterion from '../price/SpaceSizeCriterion';

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
      <Button border>戻る</Button>
      <Button position="right">次へ</Button>
    </PageContent>
    <SideBar
      renderSaveContent={() => <SaveBox step={2} />}
      renderHintContent={() => (
        <HintBox
          title="料金設定に関するヒント"
          text="荷物が思っていたよりも大きかったなど、荷物が届いた後でも柔軟に対応できる料金設定をしましょう。"
        />
      )}
    />
  </Container>
);
