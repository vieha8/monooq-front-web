import React from 'react';
import Header from 'components/NewSpace/shared/Header';
import Button, { ButtonsContainer } from 'components/NewSpace/shared/Button';
import SideBar from 'components/NewSpace/shared/SideBar';
import SaveBox from 'components/NewSpace/shared/SaveBox';
import HintBox from 'components/Shared/HintBox';
import InputAboutBaggage from 'components/NewSpace/baggage/InputAboutBaggage';
import CheckTypeFurniture from 'components/NewSpace/baggage/CheckTypeFurniture';
// import SaveBoxMobile from 'components/NewSpace/shared/SaveBoxMobile';
import FloatHintButton from 'containers/NewSpace/FloatHintButton';
import { Container, PageContent } from './Shared';

const hintProps = {
  title: '荷物情報のヒント',
  text: '大きな荷物を置けるスペースが人気です。管理に無理のない内容を記載しましょう。',
};

export default props => (
  <Container>
    <PageContent>
      <Header
        header="荷物の内容について"
        subHeader="どのような荷物に対応しますか？"
      />
      <InputAboutBaggage {...props} handleChangeText={props.handleChangeAbout} />
      <CheckTypeFurniture {...props} handleChangeCheck={props.handleChangeType} />
      <ButtonsContainer>
        <Button border onClick={props.onClickBack}>
          戻る
        </Button>
        <Button position="right" onClick={props.onClickNext} disabled={props.buttonDisabled}>
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
    <FloatHintButton {...hintProps} />
  </Container>
);
