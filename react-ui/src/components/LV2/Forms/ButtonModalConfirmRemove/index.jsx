import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Modal } from 'semantic-ui-react';
import { Dimens, Colors, FontSizes } from 'variables';
import { mediaMin } from 'helpers/style/media-query';
import ButtonLV1 from 'components/LV1/Forms/Button';

const TextRemove = styled.div`
  padding: ${Dimens.medium_20}px 0;
  cursor: pointer;
  color: ${Colors.lightGray10};
  text-align: center;
  &:active {
    opacity: 0.8;
  }

  ${mediaMin.tablet`
    &:hover {
      opacity: 0.8;
    }
  `};
`;

const Wrap = styled.div`
  position: relative;
  text-align: center;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-weight: bold;
  cursor: pointer;
  &::before,
  &::after {
    display: block;
    content: '';
    position: absolute;
    top: -5px;
    right: 5px;
    width: ${Dimens.xxsmall}px;
    height: ${Dimens.medium1}px;
    background: ${Colors.borderGray};
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(135deg);
  }
  &:active {
    opacity: 0.8;
  }

  ${mediaMin.tablet`
    &:hover {
      opacity: 0.8;
    }
  `};
`;

const Title = styled.div`
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
  padding: ${Dimens.medium3_40}px 0 ${Dimens.medium1}px;
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  margin-top: ${Dimens.medium3_40}px;
`;

const ButtonStyled = styled(ButtonLV1)`
  width: calc(100% - ${Dimens.xxsmall_4}px);
  &:nth-child(2n) {
    margin-left: ${Dimens.small}px;
    padding: ${Dimens.small2_13}px ${Dimens.small2}px;
  }
`;

class ButtonModalConfirmRemove extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    const { onClick } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <TextRemove onClick={this.open}>スペースを削除する</TextRemove>
        <Modal size="mini" open={open} onClose={this.close}>
          <Modal.Content>
            <Wrap>
              <CloseIcon onClick={this.close} />
              <Title>スペースを削除しますか？</Title>
              「削除する」を選択すると、管理画面からスペースの登録情報が抹消されます。
              <br />
              よろしいですか？
              <ButtonWrap>
                <ButtonStyled secondary borderbold fontbold fill={1} onClick={onClick}>
                  削除する
                </ButtonStyled>
                <ButtonStyled primary borderbold fontbold fill={1} onClick={this.close}>
                  キャンセル
                </ButtonStyled>
              </ButtonWrap>
            </Wrap>
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }
}

export default ButtonModalConfirmRemove;
