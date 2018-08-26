import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react';

class ErrorModal extends Component {
  state = { open: false };

  close = () => this.setState({ open: false });

  componentWillReceiveProps = next => {
    if (next.error.hasError) {
      this.setState({ open: true });
    }
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <Modal size="large" open={open} onClose={this.close}>
          <Modal.Header>Sorry...</Modal.Header>
          <Modal.Content>
            <p>
              通信エラーが発生しました。ご不便をおかけし大変申し訳ございません。<br />
              <br />
              日々改善に努めております。しばらく時間を置いても解決されない場合は、お手数ですがお問い合わせください。
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button small="true" onClick={this.close}>
              閉じる
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
});

export default connect(mapStateToProps)(ErrorModal);
