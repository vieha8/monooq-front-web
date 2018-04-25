// @flow

import React, { Component } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Redirect } from 'react-router-dom';
import Path from 'config/path';

import { messagesActions } from 'redux/modules/messages';
import { requestActions } from 'redux/modules/request';

import PaymentTemplate from 'components/atomic/templates/PaymentTemplate';
import InputPayment from 'components/atomic/LV3/InputPayment';
import PaidComplete from 'components/atomic/LV3/PaidComplete';
import PaymentInfo from 'components/atomic/LV3/PaymentInfo';
import Header from 'components/atomic/containers/Header';
import LoadingPage from 'components/atomic/LV3/LoadingPage';

import { ErrorMessage } from 'strings';

import type { SpaceType } from 'types/Space';

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
  room: {
    space: SpaceType,
  },
  messages: Array<Object>,
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
      name: '',
      number: '',
      year: moment().year(),
      month: 1,
      cvc: '',
      error: {},
    };
  }

  payment: Function;
  payment = () => {
    const { match, dispatch } = this.props;
    const { request_id: requestId, message_room_id: roomId } = match.params;
    const { name, number, year, month, cvc } = this.state;
    dispatch(
      requestActions.payment({
        roomId,
        requestId,
        payment: {
          name,
          number,
          year,
          month,
          cvc,
        },
      }),
    );
  };

  backToMessage: Function;
  backToMessage = () => {
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
        if (!String(value).match(ValidateRegExp.CardNumber)) {
          errors.push(ErrorMessage.CreditCardNumber);
        }
        break;

      case 'cvc':
        if (value.length === 0) {
          errors.push(ErrorMessage.PleaseInput);
        }
        if (!String(value).match(ValidateRegExp.Cvc)) {
          errors.push(ErrorMessage.Cvc);
        }
        break;

      default:
        break;
    }

    state[propName] = value;
    error[propName] = errors;

    this.setState({ ...state, error });
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

    const {
      match,
      room,
      messages,
      isLoading,
      isSending,
      isPaymentFailed,
      isPaymentSuccess,
    } = this.props;

    const requestId = match.params.request_id;

    if (!requestId) {
      return <Redirect to={Path.messages()} />;
    }

    if (isLoading) {
      return <LoadingPage />;
    }

    const request = messages.find(m => `${m.requestId}` === `${requestId}`);
    const space = room.space || {};

    const { name, number, month, year, cvc } = this.state;

    return (
      <PaymentTemplate
        header={<Header />}
        left={
          isPaymentSuccess ? (
            <PaidComplete spaceName={space.About} onClickToMessage={this.backToMessage} />
          ) : (
            <InputPayment
              paidError={isPaymentFailed}
              onChangeName={value => this.handleChangeUI('name', value)}
              name={name}
              onChangeNumber={value => this.handleChangeUI('number', value)}
              number={number}
              onChangeYear={value => this.handleChangeUI('year', value)}
              year={year}
              onChangeMonth={value => this.handleChangeUI('month', value)}
              month={month}
              onChangeCvc={value => this.handleChangeUI('cvc', value)}
              cvc={cvc}
              buttonDisabled={!this.validate()}
              buttonLoading={isSending}
              onClickPay={this.payment}
            />
          )
        }
        right={
          <PaymentInfo
            hostName={(space.Host || {}).Name}
            space={{
              image: {
                src: (space.Images[0] || {}).ImageUrl,
                alt: '',
              },
              address: space.Address,
              content: space.About,
              href: Path.space(space.ID),
            }}
            payment={{
              beginAt: moment(request.startDate).format('YYYY/MM/DD'),
              endAt: moment(request.endDate).format('YYYY/MM/DD'),
              duration: moment(request.endDate).diff(moment(request.startDate), 'days') + 1,
              price: numeral(request.price).format('0,0'),
            }}
          />
        }
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    room: state.messages.room,
    messages: state.messages.messages,
    isLoading: state.messages.isLoading,
    isPaymentFailed: state.api.error,
    isSending: state.request.payment.isSending,
    isPaymentSuccess: state.request.payment.isSuccess,
  });

export default connect(PaymentContainer, mapStateToProps);
