// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Modal, Button } from 'semantic-ui-react';
import { PrimaryButton } from 'components/atomic/LV1/Button/Primary';
import { Colors } from 'variables';

const PrivateButton = styled(PrimaryButton)`
  color: ${Colors.darkGray2};
  background: ${Colors.white};
  border: 1px solid ${Colors.lightGray1};
  &:hover {
    background: ${Colors.white};
    color: ${Colors.lightGray1};
    border: 1px solid ${Colors.lightGray2};
  }
`;

class ConfirmBtnModal extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    return (
      <Fragment>
        <PrivateButton fill={1} height={40} onClick={this.open}>
          {this.props.btnText}
        </PrivateButton>
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
