import React from 'react';
import FloatHintButton from 'containers/NewSpace/FloatHintButton';
import imageFurnitureFull from 'images/furniture-full.svg';
import imageFurnitureHalf from 'images/furniture-half.svg';
import imageFurnitureQuarter from 'images/furniture-quarter.svg';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Title from '../shared/Title';
import Button, { ButtonsContainer } from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import InputPriceOfType from '../price/InputPriceOfType';
import SaveBoxMobile from '../shared/SaveBoxMobile';

const hintProps = {
  title: '料金設定に関するヒント',
  text: '荷物が思っていたよりも大きかったなど、荷物が届いた後でも柔軟に対応できる料金設定をしましょう。',
};

export default props => (
  <Container>
    {console.log(props)}
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
          {...props}
          value={props.ui.space.priceFull}
          title="スペースまるごと"
          caption="あなたのスペースのほとんどを使用する荷物の場合の料金"
          placeholder="20000"
          image={imageFurnitureFull}
          onChange={props.handleChangePriceFull}
          errors={props.error.errors.priceFull}
        />
        <InputPriceOfType
          {...props}
          value={props.ui.space.priceHalf}
          title="スペース半分"
          caption="あなたのスペースの「半分」を使用する荷物の場合の料金"
          placeholder="10000"
          image={imageFurnitureHalf}
          onChange={props.handleChangePriceHalf}
          errors={props.error.errors.priceHalf}
        />
        <InputPriceOfType
          {...props}
          value={props.ui.space.priceQuarter}
          title="スペース1/4"
          caption="あなたのスペースの「4分の1」を使用する荷物の場合の料金"
          placeholder="5000"
          image={imageFurnitureQuarter}
          onChange={props.handleChangePriceQuarter}
          errors={props.error.errors.priceQuarter}
        />
      </div>
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
