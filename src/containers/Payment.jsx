import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { authConnect } from 'components/Auth';
import { uiActions } from 'redux/modules/ui';
import { errorActions } from 'redux/modules/error';
import { requestActions } from 'redux/modules/request';
import { ErrorMessage } from 'strings';
import Payment from 'components/Payment';
import Paid from 'components/Payment/Paid';
import FormValidator from 'containers/helper/FormValidator';
import Path from 'config/path';

const ValidateRegExp = {
  CardName: /^[a-zA-Z\s]+$/,
  CardNumber: /^[0-9]{16}$/,
  Cvc: /^[0-9]{3}$/,
};

class PaymentContainer extends Component {
  constructor(props) {
    super(props);

    FormValidator.initialize('payment', props.dispatch, uiActions.setUiState, errorActions.setErrorState);
    props.dispatch(uiActions.setUiState({
      payment: { month: 1, year: moment().year() },
    }));
  }

  onClickPaymentButton = () => {
    const { request_id: requestId, message_room_id: roomId } = this.props.match.params;
    const { payment } = this.props.ui;
    this.props.dispatch(requestActions.payment({ roomId, requestId, payment }));
  }

  onClickPaidButton = () => {
    const { match } = this.props;
    const { message_room_id: roomId } = match.params;
    window.location.href = Path.message(roomId);
  }

  handleChangeName = (value) => {
    const prop = 'name';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }
    if (value.length > 0 && !value.match(ValidateRegExp.CardName)) {
      errors.push(ErrorMessage.AlphaOnly('カード名義'));
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangeNumber = (value) => {
    const prop = 'number';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }
    if (!value.match(ValidateRegExp.CardNumber)) {
      errors.push(ErrorMessage.CreditCardNumber);
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangeMonth = (value) => {
    FormValidator.changeUiState('month', value, this.props.ui);
  }

  handleChangeYear = (value) => {
    FormValidator.changeUiState('year', value, this.props.ui);
  }

  handleChangeCvc = (value) => {
    const prop = 'cvc';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }
    if (!value.match(ValidateRegExp.Cvc)) {
      errors.push(ErrorMessage.Cvc);
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  validate = () => {
    const { ui } = this.props;
    const payment = ui.payment || {};

    return (
      payment.name && payment.name.length > 0 && payment.name.match(ValidateRegExp.CardName)
      && payment.number && payment.number.match(ValidateRegExp.CardNumber)
      && payment.month
      && payment.year
      && payment.cvc && payment.cvc.match(ValidateRegExp.Cvc)
    );
  }

  render() {
    const { ui, error, paymentFailed, isSending, isPaymentSuccess } = this.props;
    const payment = ui.payment || {};

    if (!ui.estimate || !ui.estimate.id) {
      return <Redirect to={Path.messages()} />;
    }

    if (isPaymentSuccess) {
      return (
        <Paid
          onClickButton={this.onClickPaidButton}
          estimate={ui.estimate}
          space={ui.estimate.space}
        />
      );
    }

    return (
      <Payment
        paymentFailed={paymentFailed}
        handleChangeName={this.handleChangeName}
        nameErrors={error.errors.name}
        handleChangeNumber={this.handleChangeNumber}
        numberErrors={error.errors.number}
        month={payment.month}
        handleChangeMonth={this.handleChangeMonth}
        year={payment.year}
        handleChangeYear={this.handleChangeYear}
        handleChangeCvc={this.handleChangeCvc}
        cvcErrors={error.errors.cvc}
        buttonDisabled={!this.validate()}
        buttonLoading={isSending}
        onClickButton={this.onClickPaymentButton}
        estimate={ui.estimate}
        space={ui.estimate.space}
      />
    );
  }
}

const mapStateToProps = state => ({
  paymentFailed: state.api.error,
  isSending: state.request.payment.isSending,
  isPaymentSuccess: state.request.payment.isSuccess,
  ui: state.ui,
  error: state.error,
});

export default authConnect(mapStateToProps)(PaymentContainer);
