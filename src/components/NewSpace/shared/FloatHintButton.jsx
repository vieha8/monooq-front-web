import React, { Component } from 'react';
import styled from 'styled-components';
import { Colors, Dimens, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';
import { uiActions } from 'redux/modules/ui';
import Icon from 'components/Shared/Icon';
import HintBoxMobile from '../shared/HintBoxMobile';

const BUTTON_SIZE = 60;

const Container = styled.div`
  display: none;
  position: fixed;
  right: ${Dimens.medium}px;
  bottom: 80px;
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
  border-radius: ${BUTTON_SIZE / 2}px;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.4);
  background-color: ${Colors.white};
  transition: 0.5s;
  &:hover {
    transition: 0.5s;
    background-color: ${Colors.lightGray2Bg};
  }
  z-index: ${ZIndexes.float};
  ${media.phone`
    display: block;
  `}
`;

export default class FloatHintButton extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(uiActions.setUiState({
      isModalShow: false,
      title: props.title,
      text: props.text,
    }));
  }

  toggleModal = () => {
    const { ui } = this.props;
    this.props.dispatch(uiActions.setUiState({
      isModalShow: !ui.isModalShow,
    }));
  }

  render() {
    const { ui } = this.props;

    return (
      <div>
        <Container onClick={this.toggleModal}>
          <Icon name="lightbulb" size={BUTTON_SIZE} fontSize={30} />
        </Container>
        <HintBoxMobile
          show={ui.isModalShow}
          title={ui.title}
          text={ui.text}
          onClickOutside={this.toggleModal}
        />
      </div>
    );
  }
}
