// @flow

import React, { Component } from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import Path from 'config/path';

import { messagesActions } from 'redux/modules/messages';
import { requestActions } from 'redux/modules/request';

import PaymentTemplate from 'components/atomic/templates/PaymentTemplate';
import InputPayment from 'components/atomic/organisms/InputPayment';
import PaymentInfo from 'components/atomic/organisms/PaymentInfo';
import Header from 'components/atomic/containers/Header';
import LoadingPage from 'components/atomic/organisms/LoadingPage';

import { ErrorMessage } from 'strings';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  match: {
    params: {
      requestId: string,
      message_room_id: string,
    },
  },
  isLoading: boolean,
  isPaymentSuccess: boolean,
  isSending: boolean,
  isPaymentFailed: boolean,
};

const ValidateRegExp = {
  CardName: /^[a-zA-Z\s]+$/,
  CardNumber: /^[0-9]{16}$/,
  Cvc: /^[0-9]{3}$/,
};

class PaymentContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    checkLogin(this.props);

    const { dispatch, match } = this.props;
    const roomId = match.params.message_room_id;
    dispatch(messagesActions.fetchMessagesStart(roomId));

    this.state = {
      year: moment().year(),
      month: 1,
      error: {},
    };
  }

  onClickPaymentButton: Function;
  onClickPaymentButton = () => {
    const { match, dispatch } = this.props;
    const { request_id: requestId, message_room_id: roomId } = match.params;
    const { year, month } = this.state;
    dispatch(requestActions.payment({ roomId, requestId, payment: { year, month } }));
  };

  onClickPaidButton: Function;
  onClickPaidButton = () => {
    const { match } = this.props;
    const { message_room_id: roomId } = match.params;
    window.location.href = Path.message(roomId);
  };

  handleChangeUI: Function;
  handleChangeUI = (propName: string, value: string) => {
    const state = this.state;
    const error = state.error;
    const errors = [];

    switch (propName) {
      case 'name':
        if (value.length === 0) {
          errors.push(ErrorMessage.PleaseInput);
        }
        if (value.length > 0 && !value.match(ValidateRegExp.CardName)) {
          errors.push(ErrorMessage.AlphaOnly('カード名義'));
        }
        break;

      case 'number':
        if (value.length === 0) {
          errors.push(ErrorMessage.PleaseInput);
        }
        if (!value.match(ValidateRegExp.CardNumber)) {
          errors.push(ErrorMessage.CreditCardNumber);
        }
        break;

      case 'cvc':
        if (value.length === 0) {
          errors.push(ErrorMessage.PleaseInput);
        }
        if (!value.match(ValidateRegExp.Cvc)) {
          errors.push(ErrorMessage.Cvc);
        }
        break;

      default:
        return;
    }

    state[propName] = value;
    error[propName] = errors;
  };

  validate: Function;
  validate = () => {
    const state = this.state;

    return (
      state.name &&
      state.name.length > 0 &&
      state.name.match(ValidateRegExp.CardName) &&
      state.number &&
      state.number.match(ValidateRegExp.CardNumber) &&
      state.month &&
      state.year &&
      state.cvc &&
      state.cvc.match(ValidateRegExp.Cvc)
    );
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { match, isLoading, isSending, isPaymentFailed, isPaymentSuccess } = this.props;

    const requestId = match.params.request_id;

    if (!requestId) {
      return <Redirect to={Path.messages()} />;
    }

    if (isLoading) {
      return <LoadingPage />;
    }

    // if (isPaymentSuccess) {
    //   return (
    //     <Paid
    //       onClickButton={this.onClickPaidButton}
    //       estimate={ui.estimate}
    //       space={ui.estimate.space}
    //     />
    //   );
    // }

    return <PaymentTemplate header={<Header />} left={<InputPayment />} right={<PaymentInfo />} />;
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    isPaymentFailed: state.api.error,
    isSending: state.request.payment.isSending,
    isPaymentSuccess: state.request.payment.isSuccess,
    isLoading: state.messages.isLoading,
  });

export default connect(PaymentContainer, mapStateToProps);
