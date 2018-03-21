import React from 'react';
import FloatHintButton from 'containers/NewSpace/FloatHintButton';
import HintBox from 'components/Shared/HintBox';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Button, { ButtonsContainer } from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import InputPriceOfAll from '../price/InputPriceOfAll';
import SaveBoxMobile from '../shared/SaveBoxMobile';

const hintProps = {
  title: '料金設定に関するヒント',
  text: '荷物が思っていたよりも大きかったなど、荷物が届いた後でも柔軟に対応できる料金設定をしましょう。',
};

export default props => (
  <Container>
    <PageContent>
      <Header
        header="料金目安を設定する"
        subHeader="あなたのスペースで荷物を預かる料金はいくら？"
      />
      <InputPriceOfAll {...props} handleChangeText={props.handleChangePriceAll} />
      <ButtonsContainer>
        <Button border onClick={props.onClickBack}>
          戻る
        </Button>
        <Button
          position="right"
          width="180"
          onClick={props.onClickComplete}
          disabled={props.buttonDisabled}
        >
          登録を完了する
        </Button>
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
