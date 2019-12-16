import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Modal, Button } from 'semantic-ui-react';
import { Dimens, Colors } from 'variables';
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

class ButtonModalConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    const { remove, btnText, modalTitle, modalText, onClick } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        {remove ? (
          <TextRemove onClick={this.open}>{btnText}</TextRemove>
        ) : (
          <ButtonLV1 secondary borderbold fontbold fill={1} onClick={this.open}>
            {btnText}
          </ButtonLV1>
        )}
        <Modal size="large" open={open} onClose={this.close}>
          <Modal.Header>{modalTitle}</Modal.Header>
          <Modal.Content>
            <p>{modalText}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button className="white" onClick={this.close}>
              いいえ
            </Button>
            <Button className="brandPrimary" onClick={onClick}>
              はい
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

export default ButtonModalConfirm;
