import React, { Component } from 'react';
import path from '../../../config/path';
import styled from 'styled-components';
import { uiActions } from 'redux/modules/ui';
import FloatHintButton from 'containers/NewSpace/FloatHintButton';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Button, { ButtonsContainer } from '../shared/Button';
import SideBar from '../shared/SideBar';
import SaveBox from '../shared/SaveBox';
import HintBox from '../shared/HintBox';
import SpaceSizeCriterion from '../price/SpaceSizeCriterion';
import SaveBoxMobile from '../shared/SaveBoxMobile';

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

export default class SpaceSize extends Component {
  static Type = {
    Small: 1,
    Large: 2,
  };

  handleChangeType = (type) => {
    const {space} = this.props.ui;
    Object.assign(space, {sizeType: type});
    this.props.dispatch(uiActions.setUiState({space}));
  };

  render() {
    const { history, ui } = this.props;
    return (
      <Container>
        <PageContent>
          <Header
            header="料金目安を設定する"
            subHeader="あなたのスペースはどちらの大きさですか？"
          />
          <CriterionWrapper>
            <SpaceSizeCriterion
              selected={ui.space.sizeType === SpaceSize.Type.Small}
              position="left"
              text="1人用ソファが入るくらい、またはそれ以下"
              onClick={() => {
                this.handleChangeType(SpaceSize.Type.Small)
              }}
            />
            <SpaceSizeCriterion
              selected={ui.space.sizeType === SpaceSize.Type.Large}
              position="right"
              text="1人用引っ越しの荷物が入るくらい、またはそれ以上"
              onClick={() => {
                this.handleChangeType(SpaceSize.Type.Large)
              }}
            />
          </CriterionWrapper>
          <ButtonsContainer>
            <Button border onClick={() => history.push(path.createSpaceReceive())}>
              戻る
            </Button>
            <Button
              position="right"
              onClick={() => {
                switch (ui.type) {
                  case SpaceSize.Type.Small:
                    history.push(path.createSpaceAllPrice());
                    break;
                  case SpaceSize.Type.Large:
                    history.push(path.createSpaceAreaPrice());
                    break;
                  default:
                    break;
                }
              }}
            >
              次へ
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
  }
}
