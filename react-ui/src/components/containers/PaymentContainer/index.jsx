// @flow

import React, { Component } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Redirect } from 'react-router-dom';
import Path from 'config/path';

import { messagesActions } from 'redux/modules/messages';
import { requestActions } from 'redux/modules/request';

import PaymentTemplate from 'components/templates/PaymentTemplate';
import InputPayment from 'components/LV3/InputPayment';
import PaidComplete from 'components/LV3/PaidComplete';
import PaymentInfo from 'components/LV3/PaymentInfo';
import Header from 'components/containers/Header';
import LoadingPage from 'components/LV3/LoadingPage';

import { ErrorMessages } from 'variables';

import type { SpaceType } from 'types/Space';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

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
  errMsgPayment: string,
};

const ValidateRegExp = {
  CardName: /^[a-zA-Z\s]+$/,
  CardNumber: /^[0-9]{16}$/,
  Cvc: /^[0-9]{3}$/,
};

class PaymentContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const { dispatch, match } = this.props;
    const roomId = match.params.message_room_id;
    dispatch(messagesActions.fetchMessagesStart(roomId));

    this.state = {
      name: '',
      number: '',
      year: moment().year(),
      month: moment().month() + 1,
      cvc: '',
      error: {},
    };
  }

  componentWillReceiveProps(nextProps: PropTypes) {
    if (
      (!this.isPaymentFailed && nextProps.isPaymentFailed) ||
      (!this.isPaymentSuccess && nextProps.isPaymentSuccess)
    ) {
      window.scrollTo(0, 0);
    }
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
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'name':
        if (value.length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        }
        if (value.length > 0 && !value.match(ValidateRegExp.CardName)) {
          errors.push(ErrorMessages.AlphaOnly('カード名義'));
        }
        break;

      case 'number':
        if (value.length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        }
        if (!Number(value) || !String(value).match(ValidateRegExp.CardNumber)) {
          errors.push(ErrorMessages.CreditCardNumber);
        }
        break;

      case 'cvc':
        if (value.length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        }
        if (!Number(value) || !String(value).match(ValidateRegExp.Cvc)) {
          errors.push(ErrorMessages.Cvc);
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
    const chkMonth = `${state.year}-${state.month}-01`;
    const nowMonth = `${moment().year()}-${moment().month() + 1}-01`;
    const dtFormat = 'YYYY-MM-DD';

    const chkMonthF = moment(chkMonth, dtFormat).format(dtFormat);
    const nowMonthF = moment(nowMonth, dtFormat).format(dtFormat);

    return (
      state.name &&
      state.name.length > 0 &&
      state.name.match(ValidateRegExp.CardName) &&
      state.number &&
      state.number.match(ValidateRegExp.CardNumber) &&
      state.month &&
      state.year &&
      moment(chkMonthF).isSameOrAfter(nowMonthF) &&
      state.cvc &&
      state.cvc.match(ValidateRegExp.Cvc)
    );
  };

  render() {
    const {
      match,
      room,
      messages,
      isLoading,
      isSending,
      isPaymentFailed,
      isPaymentSuccess,
      errMsgPayment,
    } = this.props;

    const requestId = match.params.request_id;

    if (!requestId) {
      return <Redirect to={Path.messages()} />;
    }

    if (isLoading || !room) {
      return <LoadingPage />;
    }

    const request = messages.find(m => `${m.requestId}` === `${requestId}`);
    const space = room.space || {};

    const { name, number, month, year, cvc, error } = this.state;

    return (
      <PaymentTemplate
        header={<Header />}
        left={
          isPaymentSuccess ? (
            <PaidComplete spaceName={space.Title} onClickToMessage={this.backToMessage} />
          ) : (
            <InputPayment
              paidError={isPaymentFailed}
              errMsgPayment={errMsgPayment}
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
              errors={error}
            />
          )
        }
        right={
          <PaymentInfo
            isHost
            user={space.Host}
            space={{
              image: {
                src: (space.Images[0] || {}).ImageUrl,
                alt: '',
              },
              address: space.Address,
              content: space.Title,
              href: Path.space(space.ID),
            }}
            payment={{
              beginAt: moment(request.startDate.toDate()).format('YYYY/MM/DD'),
              endAt: moment(request.endDate.toDate()).format('YYYY/MM/DD'),
              duration:
                moment(request.endDate.toDate()).diff(moment(request.startDate.toDate()), 'days') +
                1,
              price: numeral(request.price).format('0,0'),
            }}
          />
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  room: state.messages.room,
  messages: state.messages.messages,
  isLoading: state.messages.isLoading,
  isSending: state.request.payment.isSending,
  isPaymentSuccess: state.request.payment.isSuccess,
  isPaymentFailed: state.request.payment.isFailed,
  errMsgPayment: state.request.payment.errMsg,
});

export default authRequired(connect(mapStateToProps)(PaymentContainer));
