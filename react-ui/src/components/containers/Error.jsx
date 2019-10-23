import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react';
import { captureMessage } from '@sentry/browser';

class ErrorModal extends Component {
  state = { open: false };

  close = () => this.setState({ open: false });

  componentWillReceiveProps = next => {
    if (next.error.hasError) {
      this.setState({ open: true });
      let msg = 'Error';
      if (next.error.message) {
        msg = `error(${next.error.functionName}):${next.error.message}`;
      }
      captureMessage(msg);
    }
  };

  render() {
    const { open } = this.state;
    const { error } = this.props;

    return (
      <Modal size="large" open={open} onClose={this.close}>
        <Modal.Header>Sorry...</Modal.Header>
        <Modal.Content>
          {error.message !== '' ? (
            <p>{error.message}</p>
          ) : (
            <p>
              エラーが発生しました。ご不便をおかけし大変申し訳ございません。
              <br />
              <br />
              日々改善に努めております。しばらく時間を置いて再度試しても解決されない場合は、お手数ですがお問い合わせください。
            </p>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button small={1} onClick={this.close}>
            閉じる
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
});

export default connect(mapStateToProps)(ErrorModal);
