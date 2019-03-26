// @flow

import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import ButtonLV1 from 'components/atomic/LV1/Button';

class ConfirmBtnModal extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    return (
      <Fragment>
        <ButtonLV1 secondary borderbold fontbold fill={1} onClick={this.open}>
          {this.props.btnText}
        </ButtonLV1>
        <Modal size="large" open={this.state.open} onClose={this.close}>
          <Modal.Header>{this.props.modalTitle}</Modal.Header>
          <Modal.Content>
            <p>{this.props.modalText}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button className="ui white button" onClick={this.close}>
              いいえ
            </Button>
            <Button className="ui brandPrimary button" onClick={this.props.onClickRemove}>
              はい
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

export default ConfirmBtnModal;
