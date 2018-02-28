import React from 'react';
import { routes } from 'config/routes';
import Header from 'components/create-space/shared/Header';
import Button, { ButtonsContainer } from 'components/create-space/shared/Button';
import SideBar from 'components/create-space/shared/SideBar';
import SaveBox from 'components/create-space/shared/SaveBox';
import HintBox from 'components/create-space/shared/HintBox';
import InputAboutBaggage from 'components/create-space/baggage/InputAboutBaggage';
import CheckTypeFurniture from 'components/create-space/baggage/CheckTypeFurniture';
import SaveBoxMobile from 'components/create-space/shared/SaveBoxMobile';
import FloatHintButton from 'containers/CreateSpace/FloatHintButton';
import { Container, PageContent } from './Shared';

const hintProps = {
  title: '荷物情報のヒント',
  text: 'ユーザーには大きな荷物を預けられるスペースが人気です。あなたのスペースでも無理のない保管ができる内容を記載しましょう。',
};

export default (props) => {
  const { history } = props;
  return (
    <Container>
      <PageContent>
        <Header
          header="預かる荷物について"
          subHeader="あなたのスペースでどんな荷物を預かりますか？"
        />
        <InputAboutBaggage />
        <CheckTypeFurniture />
        <ButtonsContainer>
          <Button border onClick={() => history.push(routes.spaceNewInfo.path)}>
            戻る
          </Button>
          <Button position="right" onClick={() => history.push(routes.spaceNewReceive.path)}>
            次へ
          </Button>
        </ButtonsContainer>
      </PageContent>
      <SideBar
        renderMainContent={() => <SaveBox step={2} />}
        renderHintContent={() => (
          <HintBox {...hintProps} />
        )}
      />
      <SaveBoxMobile />
      <FloatHintButton {...hintProps} />
    </Container>
  );
};
