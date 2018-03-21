import React, { Component } from 'react';
import { authConnect } from 'components/Auth';
import { uiActions } from 'redux/modules/ui';
import { requestActions } from 'redux/modules/request';
import Payment from 'components/Payment';

class PaymentContainer extends Component {
  handleChange = ({ target }) => {
    const { card } = this.props.ui;
    Object.assign(card, { [target.name]: target.value });
    this.props.dispatch(uiActions.setUiState({ card }));
  };

  onClickPaymentButton = () => {
    const { request_id: requestId, message_room_id: roomId } = this.props.match.params;
    const { card } = this.props.ui;
    this.props.dispatch(requestActions.payment({ roomId, requestId, card }));
  };

  render() {
    return (
      <Payment />
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default authConnect(mapStateToProps)(PaymentContainer);
