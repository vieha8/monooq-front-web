import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import moment from 'moment';
import Path from 'config/path';
import { Dimens, Colors, FontSizes, ZIndexes, ErrorMessages } from 'variables';
import { media } from 'helpers/style/media-query';
import { iskeyDownEnter } from 'helpers/keydown';
import { requestActions } from 'redux/modules/request';
import Info from 'components/LV2/Payment/Info';
import PaidText from 'components/LV2/Payment/PaidText';
import {
  Height as HeaderHeight,
  HeightPhone as HeaderHeightPhone,
} from 'components/LV3/Header/View';
import Completed from './Completed';
import InputForm from './InputForm';

const MAX_PAY_PRICE_CONVENIENT = 49999;
const MODE_VIEW_INPUT = 0;
const MODE_VIEW_CONFIRM = 1;

const ValidateRegExp = {
  CardName: /^[a-zA-Z\s]+$/,
  CardNumber: /^[0-9]{16}$/,
  Cvc: /^[0-9]{3}$/,
};

const Spacer = styled.div`
  margin: ${Dimens.large_60}px auto 0;
  ${media.tablet`
    margin: ${Dimens.medium3_40}px auto 0;
  `};
`;

const HeadMessage = styled.div`
  width: 100%;
  height: 54px;
  display: block;
  position: fixed;
  left: 0px;
  top: ${HeaderHeight}px;
  z-index: ${ZIndexes.frontParts};
  text-align: center;
  padding: ${Dimens.medium_17}px;
  line-height: 22px;
  font-size: ${FontSizes.small_15}px;
  font-weight: bold;
  color: ${Colors.white};
  background-color: ${Colors.brandPrimary};
  ${media.tablet`
    top: ${HeaderHeightPhone}px;
  `};
`;

const PaymentInputForm = ({
  space,
  paymentData,
  requestPrice,
  paymentUrl,
  isPaymentSuccess,
  paidError,
  errMsgPayment,
  buttonLoading,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(moment().month() + 1);
  const [cvc, setCvc] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(-1);
  const [modeView, setModeView] = useState(MODE_VIEW_INPUT);

  const { request_id: requestId } = useParams();
  const { message_room_id: roomId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [paidError, isPaymentSuccess]);

  const validate = price => {
    const chkMonth = `${year}-${month}-01`;
    const nowMonth = `${moment().year()}-${moment().month() + 1}-01`;
    const dtFormat = 'YYYY-MM-DD';

    const chkMonthF = moment(chkMonth, dtFormat).format(dtFormat);
    const nowMonthF = moment(nowMonth, dtFormat).format(dtFormat);

    if (paymentMethod === 1) {
      if (Number(price) > MAX_PAY_PRICE_CONVENIENT) {
        return false;
      }
      return true;
    }
    if (paymentMethod === 2) {
      return true;
    }

    return (
      name &&
      name.length > 0 &&
      name.match(ValidateRegExp.CardName) &&
      number &&
      number.match(ValidateRegExp.CardNumber) &&
      month &&
      year &&
      moment(chkMonthF).isSameOrAfter(nowMonthF) &&
      cvc &&
      cvc.match(ValidateRegExp.Cvc)
    );
  };

  const handleChangeUI = (propName, inputValue) => {
    const setError = [];

    switch (propName) {
      case 'name':
        if (!inputValue || inputValue.length === 0) {
          setError.push(ErrorMessages.PleaseInput);
        }
        if (inputValue.length > 0 && !inputValue.match(ValidateRegExp.CardName)) {
          setError.push(ErrorMessages.AlphaOnly('カード名義'));
        }
        break;

      case 'number':
        if (!inputValue || inputValue.length === 0) {
          setError.push(ErrorMessages.PleaseInput);
        }
        if (Number.isNaN(inputValue) || !String(inputValue).match(ValidateRegExp.CardNumber)) {
          setError.push(ErrorMessages.CreditCardNumber);
        }
        break;

      case 'cvc':
        if (!inputValue || inputValue.length === 0) {
          setError.push(ErrorMessages.PleaseInput);
        }
        if (Number.isNaN(inputValue) || !String(inputValue).match(ValidateRegExp.Cvc)) {
          setError.push(ErrorMessages.Cvc);
        }
        break;

      default:
        break;
    }
    setErrors(state => ({ ...state, [propName]: setError }));
  };

  const backButton = () => {
    window.scrollTo(0, 0);
    dispatch(requestActions.paymentPrepare());

    setModeView(MODE_VIEW_INPUT);
    if (modeView === MODE_VIEW_INPUT) {
      history.push(Path.message(roomId));
    } else if (modeView === MODE_VIEW_CONFIRM) {
      setModeView(MODE_VIEW_INPUT);
    }
  };

  const onKeyDownBackButton = e => {
    if (iskeyDownEnter(e)) {
      backButton();
    }
  };

  const payment = () => {
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

  const paymentConvenience = () => {
    const apiEndpointName = 'econtext';
    dispatch(requestActions.paymentOther({ apiEndpointName, requestId }));
  };

  const paymentBank = () => {
    const apiEndpointName = 'bank';
    dispatch(requestActions.paymentOther({ apiEndpointName, requestId }));
  };

  const confirmButton = () => {
    window.scrollTo(0, 0);
    if (paymentMethod === 2) {
      paymentBank();
    } else {
      setModeView(MODE_VIEW_CONFIRM);
    }
  };

  const onKeyDownPay = e => {
    if (iskeyDownEnter(e) && validate()) {
      if (modeView === MODE_VIEW_INPUT) {
        confirmButton();
      } else if (modeView === MODE_VIEW_CONFIRM) {
        switch (paymentMethod) {
          case 0:
            payment();
            break;
          case 1:
            paymentConvenience();
            break;
          default:
        }
      }
    }
  };

  const onClickSubmit = () => {
    if (modeView === MODE_VIEW_CONFIRM) {
      if (paymentMethod === 0) {
        payment();
      } else {
        paymentConvenience();
      }
    } else {
      confirmButton();
    }
  };

  const getTextBackButton = () => {
    let textButton = '戻る';
    if (modeView === MODE_VIEW_CONFIRM) {
      if (paymentMethod === 0) {
        textButton = '修正する';
      } else {
        textButton = '戻る';
      }
    }
    return textButton;
  };

  const getTextSubmitButton = () => {
    let textButton = '確定する';
    if (modeView !== MODE_VIEW_CONFIRM) {
      if (paymentMethod !== 2) {
        textButton = '確認する';
      }
    }
    return textButton;
  };

  let isConfirm = false;
  if (modeView === MODE_VIEW_CONFIRM) {
    isConfirm = true;
  }

  let headline = '';
  let description = '';
  if (isPaymentSuccess) {
    switch (paymentMethod) {
      case 0:
        headline = '決済が完了しました';
        description = <PaidText paymentMethod={paymentMethod} />;
        break;
      case 1:
        headline = 'お支払い方法が確定しました';
        description = <PaidText paymentMethod={paymentMethod} paymentUrl={paymentUrl} />;
        break;
      default:
    }
    return <Completed headline={headline} description={description} />;
  }

  return (
    <Fragment>
      <HeadMessage>
        {isConfirm ? 'お支払い内容を確認してください' : 'お支払い方法を選択してください'}
      </HeadMessage>
      <Spacer />
      <Info space={space} />
      <InputForm
        paymentData={paymentData}
        errors={errors}
        paidError={paidError}
        errMsgPayment={errMsgPayment}
        isConfirm={isConfirm}
        paymentMethod={paymentMethod}
        number={number}
        name={name}
        month={month}
        year={year}
        cvc={cvc}
        onChangeName={e => handleChangeUI('name', e.target.value, setName(e.target.value))}
        onChangeNumber={e => handleChangeUI('number', e.target.value, setNumber(e.target.value))}
        onChangeMonth={e => handleChangeUI('month', e.target.value, setMonth(e.target.value))}
        onChangeYear={e => handleChangeUI('year', e.target.value, setYear(e.target.value))}
        onChangeCvc={e => handleChangeUI('cvc', e.target.value, setCvc(e.target.value))}
        onClickPaymentMethod={value => setPaymentMethod(value)}
        backButton={backButton}
        onKeyDownBackButton={onKeyDownBackButton}
        textBackButton={getTextBackButton()}
        disabledPayButton={!validate(requestPrice)}
        buttonLoading={buttonLoading}
        onClickSubmit={onClickSubmit}
        onKeyDownPay={onKeyDownPay}
        textSubmitButton={getTextSubmitButton()}
      />
    </Fragment>
  );
};

export default PaymentInputForm;
