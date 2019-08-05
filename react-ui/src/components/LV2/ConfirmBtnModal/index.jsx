// @flow

import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import ButtonLV1 from 'components/LV1/Forms/Button';

type PropTypes = {
  btnText: string,
  modalTitle: string,
  modalText: string,
  onClickRemove: Function,
};

class ConfirmBtnModal extends Component<PropTypes> {
  state = { open: false };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    const { btnText, modalTitle, modalText, onClickRemove } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <ButtonLV1 secondary borderbold fontbold fill={1} onClick={this.open}>
          {btnText}
        </ButtonLV1>
        <Modal size="large" open={open} onClose={this.close}>
          <Modal.Header>{modalTitle}</Modal.Header>
          <Modal.Content>
            <p>{modalText}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button className="white" onClick={this.close}>
              いいえ
            </Button>
            <Button className="brandPrimary" onClick={onClickRemove}>
              はい
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

export default ConfirmBtnModal;
