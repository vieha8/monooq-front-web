import React from 'react';
import path from '../../../config/path';
import FloatHintButton from 'containers/NewSpace/FloatHintButton';
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

const hintProps = {
  title: 'スペース登録のヒント',
  text: 'ユーザーが自分の荷物が入るかイメージできるようにスペースの情報やアピールポイントを掲載しましょう！',
};

export default (props) => {
  const { history } = props;
  const header = (props.ui.isEdit)? "編集" : "登録";

  const onClickNext = () => {
    if(props.ui.isEdit){
      history.push(path.editSpaceBaggage(props.ui.spaceId));
    }else{
      history.push(path.createSpaceBaggage());
    }
  };

  return (
    <Container>
      <PageContent>
        <Header
          header={`スペースを${header}する`}
          subHeader="どんなスペースを掲載しますか？"
        />
        <ImageDrop {...props} />
        <InputTitle {...props} />
        <SelectType {...props} />
        <InputIntro {...props} />
        <InputAddress {...props} />
        <ButtonsContainer>
          <Button onClick={onClickNext}>
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
