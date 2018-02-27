import React from 'react';
import { routes } from '../../../config/routes';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Button, { ButtonsContainer } from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import ImageDrop from '../space/ImageDrop';
import InputTitle from '../space/InputTitle';
import SelectType from '../space/SelectType';
import InputIntro from '../space/InputIntro';
import InputAddress from '../space/InputAddress';
import SaveBoxMobile from '../shared/SaveBoxMobile';
import FloatHintButton from '../../../containers/CreateSpace/FloatHintButton';

const hintProps = {
  title: 'スペース登録のヒント',
  text: 'ユーザーが自分の荷物が入るかイメージできるようにスペースの情報やアピールポイントを掲載しましょう！',
};

export default (props) => {
  const { history } = props;
  return (
    <Container>
      <PageContent>
        <Header
          header="スペースを登録する"
          subHeader="どんなスペースを掲載しますか？"
        />
        <ImageDrop />
        <InputTitle />
        <SelectType />
        <InputIntro />
        <InputAddress />
        <ButtonsContainer>
          <Button onClick={() => history.push(routes.spaceNewBaggage.path)}>
            次へ
          </Button>
        </ButtonsContainer>
      </PageContent>
      <SideBar
        renderMainContent={() => <SaveBox step={1} />}
        renderHintContent={() => (
          <HintBox {...hintProps} />
        )}
      />
      <SaveBoxMobile />
      <FloatHintButton {...hintProps} />
    </Container>
  );
};
