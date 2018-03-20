import React from 'react';
import path from '../../../config/path';
import Header from 'components/NewSpace/shared/Header';
import Button, { ButtonsContainer } from 'components/NewSpace/shared/Button';
import SideBar from 'components/NewSpace/shared/SideBar';
import SaveBox from 'components/NewSpace/shared/SaveBox';
import HintBox from 'components/NewSpace/shared/HintBox';
import InputAboutBaggage from 'components/NewSpace/baggage/InputAboutBaggage';
import CheckTypeFurniture from 'components/NewSpace/baggage/CheckTypeFurniture';
import SaveBoxMobile from 'components/NewSpace/shared/SaveBoxMobile';
import FloatHintButton from 'containers/NewSpace/FloatHintButton';
import { Container, PageContent } from './Shared';

const hintProps = {
  title: '荷物情報のヒント',
  text: 'ユーザーには大きな荷物を預けられるスペースが人気です。あなたのスペースでも無理のない保管ができる内容を記載しましょう。',
};

export default (props) => {
  const { history } = props;

  const onClickNext = () => {
    if(props.ui.isEdit){
      history.push(path.editSpaceReceive(props.ui.spaceId));
    }else{
      history.push(path.createSpaceReceive());
    }
  };

  const onClickBack = () => {
    if(props.ui.isEdit){
      history.push(path.editSpaceInfo(props.ui.spaceId));
    }else{
      history.push(path.createSpaceInfo());
    }
  };

  return (
    <Container>
      <PageContent>
        <Header
          header="預かる荷物について"
          subHeader="あなたのスペースでどんな荷物を預かりますか？"
        />
        <InputAboutBaggage {...props} />
        <CheckTypeFurniture {...props} />
        <ButtonsContainer>
          <Button border onClick={onClickBack}>
            戻る
          </Button>
          <Button position="right" onClick={onClickNext}>
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
