// @flow

import React, { Component, Fragment } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Redirect } from 'react-router-dom';
import Path from 'config/path';

import { requestActions } from 'redux/modules/request';

import styled from 'styled-components';
import { media } from 'helpers/style/media-query';

import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import InputPayment from 'components/LV3/InputPayment';
import Header from 'components/containers/Header';
import LoadingPage from 'components/LV3/LoadingPage';
import Button from 'components/LV1/Button';
import { H1 } from 'components/LV1/Headline';

import { Dimens, Colors, FontSizes, ErrorMessages } from 'variables';

import type { SpaceType } from 'types/Space';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';
import { formatDate, formatStringSlash } from 'helpers/date';
import { iskeyDownEnter } from 'helpers/keydown';

const MAX_PAY_PRICE_CONVENIENT = 49999;

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

const Spacer = styled.div`
  margin: 40px auto 0;
  ${media.tablet`
  `};
`;

const HeadlineWrap = styled.div`
  margin: 0px auto ${Dimens.medium2}px;
  font-size: ${FontSizes.small_15}px;
  line-height: normal;
`;

const DescriptionWrap = styled.div`
  margin: 0px auto ${Dimens.medium2}px;
  font-size: ${FontSizes.small_15}px;
  line-height: normal;
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.phone`
    display: block;
    width: 100%;
    max-width: 100%;
    position: relative;
    left: 0px;
    bottom: 0px;
    text-align: center;
    padding: 0 0px 15px;
  `};
`;

const CmnWrap = styled.div`
  margin: ${Dimens.medium_20}px;
  ${props =>
    props.noMarginSide &&
    `
    margin: ${Dimens.medium_20}px auto;
  `}
  ${media.phone`
    margin: ${Dimens.medium_20}px auto;
  `};
`;

const AccountNumber = styled.div`
  max-width: 250px;
  background-color: ${Colors.lightYellow};
  border-radius: ${Dimens.xsmall}px;
  margin: 0px auto ${Dimens.medium_20}px;
  padding: ${Dimens.medium_20}px;
  text-align: center;
  line-height: 1.5rem;
  letter-spacing: 0.05em;
  font-weight: bold;
`;

const PaymentUrl = styled.a`
  word-break: break-all;
`;

class PaymentContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    const { dispatch, match } = this.props;
    const roomId = match.params.room_id;
    const requestId = match.params.request_id;
    dispatch(requestActions.fetchRequest(requestId));

    this.state = {
      name: '',
      number: '',
      year: moment().year(),
      month: moment().month() + 1,
      cvc: '',
      paymentMethod: -1,
      error: {},
      modeView: 0,
      roomId: roomId || '',
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

  paymentConvenience = () => {
    const { match, dispatch } = this.props;
    const { request_id: requestId } = match.params;
    const apiEndpointName = 'econtext';
    dispatch(requestActions.paymentOther({ apiEndpointName, requestId }));
  };

  paymentBank = () => {
    const { match, dispatch } = this.props;
    const { request_id: requestId } = match.params;
    const apiEndpointName = 'bank';
    dispatch(requestActions.paymentOther({ apiEndpointName, requestId }));
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
        if (isNaN(value) || !String(value).match(ValidateRegExp.CardNumber)) {
          errors.push(ErrorMessages.CreditCardNumber);
        }
        break;

      case 'cvc':
        if (value.length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        }
        if (isNaN(value) || !String(value).match(ValidateRegExp.Cvc)) {
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

  onKeyDownBack: Function;

  onKeyDownBack = e => {
    if (iskeyDownEnter(e)) {
      const { modeView } = this.state;
      if (modeView === 0) {
        this.backToMessage();
      } else if (modeView === 1) {
        this.backButton();
      }
    }
  };

  onKeyDownPay: Function;

  onKeyDownPay = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      const { paymentMethod, modeView } = this.state;
      if (modeView === 0) {
        this.confirmButton();
      } else if (modeView === 1) {
        switch (paymentMethod) {
          case 0:
            this.payment();
            break;
          case 1:
            this.paymentConvenience();
            break;
          default:
        }
      }
    }
  };

  onKeyDownMessage: Function;

  onKeyDownMessage = e => {
    if (iskeyDownEnter(e)) {
      this.backToMessage();
    }
  };

  validate: Function;

  validate = price => {
    const { state } = this;
    const chkMonth = `${state.year}-${state.month}-01`;
    const nowMonth = `${moment().year()}-${moment().month() + 1}-01`;
    const dtFormat = 'YYYY-MM-DD';

    const chkMonthF = moment(chkMonth, dtFormat).format(dtFormat);
    const nowMonthF = moment(nowMonth, dtFormat).format(dtFormat);

    if (state.paymentMethod === 1) {
      if (Number(price) > MAX_PAY_PRICE_CONVENIENT) {
        return false;
      }
      return true;
    }

    if (state.paymentMethod === 2) {
      return true;
    }

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

  leftContent = () => {
    const { request, isSending, isPaymentFailed, errMsgPayment } = this.props;
    const space = request.space || {};
    const { name, number, month, year, cvc, error, paymentMethod } = this.state;
    return (
      <InputPayment
        space={space}
        onChangeIsHost={value => this.handleChangeUI('paymentMethod', value)}
        paymentMethod={paymentMethod}
        payment={{
          beginAt: formatDate(new Date(request.startDate), formatStringSlash),
          endAt: formatDate(new Date(request.endDate), formatStringSlash),
          duration: moment(request.endDate).diff(moment(request.startDate), 'days') + 1,
          price: numeral(request.price).format('0,0'),
        }}
        errors={error}
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
        buttonDisabled={!this.validate(request.price)}
        buttonLoading={isSending}
        onKeyDownBack={this.onKeyDownBack}
        onKeyDownPay={this.onKeyDownPay}
        backButton={this.backButtonMessage}
        submitButton={this.confirmButton}
        backButtonText="戻る"
        submitButtonText={paymentMethod === 2 ? '確定する' : '確認する'}
      />
    );
  };

  leftContentConfirm = () => {
    const { request, isSending, isPaymentFailed, errMsgPayment } = this.props;
    const space = request.space || {};
    const { name, number, paymentMethod } = this.state;

    return (
      <InputPayment
        space={space}
        onChangeIsHost={value => this.handleChangeUI('paymentMethod', value)}
        paymentMethod={paymentMethod}
        payment={{
          beginAt: formatDate(new Date(request.startDate), formatStringSlash),
          endAt: formatDate(new Date(request.endDate), formatStringSlash),
          duration: moment(request.endDate).diff(moment(request.startDate), 'days') + 1,
          price: numeral(request.price).format('0,0'),
        }}
        paidError={isPaymentFailed}
        errMsgPayment={errMsgPayment}
        name={name}
        number={number}
        buttonDisabled={!this.validate(request.price)}
        buttonLoading={isSending}
        onKeyDownBack={this.onKeyDownBack}
        onKeyDownPay={this.onKeyDownPay}
        backButton={this.backButton}
        submitButton={paymentMethod === 0 ? this.payment : this.paymentConvenience}
        backButtonText={paymentMethod === 0 ? '修正する' : '戻る'}
        submitButtonText="確定する"
        confirm
      />
    );
  };

  leftContentComplete = (headline, description) => {
    return (
      <Fragment>
        <HeadlineWrap>
          <H1>{headline}</H1>
        </HeadlineWrap>
        <DescriptionWrap>{description}</DescriptionWrap>
        <ButtonWrap>
          <Button
            primary
            fontbold
            center
            onClick={this.backButtonMessage}
            onKeyDown={this.onKeyDownMessage}
          >
            メッセージ画面に戻る
          </Button>
        </ButtonWrap>
      </Fragment>
    );
  };

  backButtonMessage = () => {
    window.scrollTo(0, 0);
    const { history } = this.props;
    const { roomId } = this.state;
    history.push(Path.message(roomId));
  };

  backButton = () => {
    window.scrollTo(0, 0);
    this.setState({ modeView: 0 });
  };

  confirmButton = () => {
    window.scrollTo(0, 0);
    const { paymentMethod } = this.state;
    if (paymentMethod === 2) {
      this.paymentBank();
    } else {
      this.setState({ modeView: 1 });
    }
  };

  rightContent = () => {
    return (
      <Fragment>
        <Spacer />
        <ServiceMenu />
      </Fragment>
    );
  };

  render() {
    const { match, request, paymentUrl, isPaymentSuccess } = this.props;

    const requestId = match.params.request_id;
    if (!requestId) {
      return <Redirect to={Path.messages()} />;
    }

    if (!request) {
      return <LoadingPage />;
    }

    const { paymentMethod, modeView } = this.state;

    let headline = '';
    let description = '';

    let leftContent = this.leftContent();

    if (modeView === 1) {
      leftContent = this.leftContentConfirm();
    }

    if (isPaymentSuccess) {
      switch (paymentMethod) {
        case 0:
          headline = '決済が完了しました';
          description = (
            <Fragment>
              メッセージ画面からスペースの住所を確認し、荷物を届けましょう。
              <br />
              <br />
              具体的な搬入日時はお決まりですか？
              <br />
              まだの場合はホストと調整を行いましょう。
            </Fragment>
          );
          break;
        case 1:
          headline = 'お支払い方法が確定しました';
          description = (
            <Fragment>
              下記から決済画面に移動し、お支払いをお願いします。
              <br />
              <br />
              <PaymentUrl href={paymentUrl} target="_blank" rel="noopener noreferrer">
                {paymentUrl}
              </PaymentUrl>
              <br />
              <br />
              決済画面URLなどのお支払い情報はご登録メールアドレスにもお送りしております。
            </Fragment>
          );
          break;
        case 2:
          headline = 'お支払い方法が確定しました';
          description = (
            <Fragment>
              下記口座にお振込後、
              <a href="mailto:support@monooq.com?subject=銀行振込が完了しました&amp;body=こちらのメールに振込明細のお写真と、モノオクに登録しているメールアドレスをお送りください。">
                support@monooq.com
              </a>
              まで振込明細の写真とモノオクに登録しているメールアドレスをお送りください。
              <CmnWrap>
                <AccountNumber>
                  みずほ銀行 渋谷中央支店
                  <br />
                  普通 1806441 モノオク(カ
                </AccountNumber>
              </CmnWrap>
              振込先口座などのお支払い情報はご登録メールアドレスにもお送りしております。
            </Fragment>
          );
          break;
        default:
          headline = 'お支払い方法が確定しました';
          description = <Fragment>決済が完了しました。ホストに連絡して、具体的な●●●●●〜</Fragment>;
      }
      leftContent = this.leftContentComplete(headline, description);
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        leftContent={leftContent}
        rightContent={this.rightContent()}
      />
    );
  }
}

const mapStateToProps = state => ({
  request: state.request.request,
  isSending: state.request.payment.isSending,
  isPaymentSuccess: state.request.payment.isSuccess,
  isPaymentFailed: state.request.payment.isFailed,
  errMsgPayment: state.request.payment.errMsg,
  paymentUrl: state.request.payment.url,
});

export default authRequired(connect(mapStateToProps)(PaymentContainer));
