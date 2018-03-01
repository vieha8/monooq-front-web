import React from 'react';
import { routes } from 'config/routes';
import FloatHintButton from 'containers/NewSpace/FloatHintButton';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Button, { ButtonsContainer } from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import HowToReceive from '../receive/HowToReceive';
import ReceiveDetail from '../receive/ReceiveDetail';
import SaveBoxMobile from '../shared/SaveBoxMobile';

const hintProps = {
  title: '荷物受け取りのヒント',
  text: 'もし、あなたが車でお手伝いができるならアピールをしましょう。ユーザーに喜んでもらえますよ！',
};

export default (props) => {
  const { history } = props;
  return (
    <Container>
      <PageContent>
        <Header
          header="荷物の受け取りについて"
          subHeader="どのように荷物を受け取りますか？"
        />
        <HowToReceive />
        <ReceiveDetail />
        <ButtonsContainer>
          <Button border onClick={() => history.push(routes.spaceNewBaggage.path)}>
            戻る
          </Button>
          <Button position="right" onClick={() => history.push(routes.spaceNewSize.path)}>
            次へ
          </Button>
        </ButtonsContainer>
      </PageContent>
      <SideBar
        renderMainContent={() => <SaveBox step={3} />}
        renderHintContent={() => (
          <HintBox {...hintProps} />
        )}
      />
      <SaveBoxMobile />
      <FloatHintButton {...hintProps} />
    </Container>
  );
};
