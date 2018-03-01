import React, { Component } from 'react';
import styled from 'styled-components';
import { uiActions } from 'redux/modules/ui';
import { routes } from 'config/routes';
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
  }

  constructor(props) {
    super(props);

    this.props.dispatch(uiActions.setUiState({
      type: 0,
    }));
  }

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
              selected={ui.type === SpaceSize.Type.Small}
              position="left"
              text="1人用ソファが入るくらい、またはそれ以下"
              onClick={() => {
                this.props.dispatch(uiActions.setUiState({
                  type: SpaceSize.Type.Small,
                }));
              }}
            />
            <SpaceSizeCriterion
              selected={ui.type === SpaceSize.Type.Large}
              position="right"
              text="1人用引っ越しの荷物が入るくらい、またはそれ以上"
              onClick={() => {
                this.props.dispatch(uiActions.setUiState({
                  type: SpaceSize.Type.Large,
                }));
              }}
            />
          </CriterionWrapper>
          <ButtonsContainer>
            <Button border onClick={() => history.push(routes.spaceNewReceive.path)}>
              戻る
            </Button>
            <Button
              position="right"
              onClick={() => {
                switch (ui.type) {
                  case SpaceSize.Type.Small:
                    history.push(routes.spaceNewAllPrice.path);
                    break;
                  case SpaceSize.Type.Large:
                    history.push(routes.spaceNewPrice.path);
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
