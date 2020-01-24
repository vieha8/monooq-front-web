import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react';

class ErrorModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidUpdate(prevProps, prevState) {
    const { error } = this.props;
    if (error.hasError && !prevState.open) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ open: true });
    }
  }

  close = () => this.setState({ open: false });

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
          <Button onClick={this.close}>閉じる</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
});

export default connect(mapStateToProps)(ErrorModal);
