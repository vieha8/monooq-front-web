import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import moment from 'moment';
import numeral from 'numeral';
import Path from 'config/path';
import { Dimens, Colors, FontSizes, ZIndexes, ErrorMessages } from 'variables';
import { media } from 'helpers/style/media-query';
import { iskeyDownEnter } from 'helpers/keydown';
import { isAvailableLocalStorage } from 'helpers/storage';
import { requestActions } from 'redux/modules/request';
import { H1 } from 'components/LV1/Texts/Headline';
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
const NAME_LOCAL_STORAGE_PARAMS = 'payment_params';

const ValidateRegExp = {
  CardName: /^[a-zA-Z\s]+$/,
  CardNumber: /^[0-9]{16}$/,
  Cvc: /^[0-9]{3}$/,
};

const Wrap = styled.div`
  width: 100%;
  max-width: 375px;
  margin: auto;
`;

const TitleCaption = styled.div`
  margin: ${Dimens.medium}px auto;
  font-size: ${FontSizes.small}px;
  line-height: normal;
  ${media.phone`
    font-size: ${FontSizes.small_12}px;
  `};
`;

const PaymentInputForm = ({
  space,
  paymentData,
  paymentUrl,
  isPaymentSuccess,
  paidError,
  errMsgPayment,
  buttonLoading,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  let defaultName = '';
  let defaultNumber = '';
  let defaultYear = moment().year();
  let defaultMonth = moment().month() + 1;
  let defaultCvc = '';

  if (process.env.NODE_ENV !== 'production') {
    if (isAvailableLocalStorage() && localStorage.getItem(NAME_LOCAL_STORAGE_PARAMS)) {
      const savedParams = JSON.parse(localStorage.getItem(NAME_LOCAL_STORAGE_PARAMS));
      const { name, number, year, month, cvc } = savedParams;
      defaultName = name;
      defaultNumber = number;
      defaultYear = year;
      defaultMonth = month;
      defaultCvc = cvc;
    }
  }

  const [errors, setErrors] = useState({});
  const [name, setName] = useState(defaultName);
  const [number, setNumber] = useState(defaultNumber);
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);
  const [cvc, setCvc] = useState(defaultCvc);
  const [paymentType, setPaymentType] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(0);
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
      setPaymentType(0);
      setPaymentMethod(0);
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
    if (process.env.NODE_ENV !== 'production') {
      if (isAvailableLocalStorage()) {
        const params = {
          name,
          number,
          year,
          month,
          cvc,
        };
        localStorage.setItem(NAME_LOCAL_STORAGE_PARAMS, JSON.stringify(params));
      }
    }
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

  const onClickSubmitConvenience = () => {
    setPaymentType(1);
    setPaymentMethod(1);
    onClickSubmit();
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
  if (modeView === MODE_VIEW_CONFIRM && !errMsgPayment) {
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
    <Wrap>
      <H1 bold>見積もり作成</H1>
      <TitleCaption>
        見積もり書をご確認の上、内容に問題なければお支払い方法を選択してください。
      </TitleCaption>
      <InputForm
        space={space}
        paymentData={paymentData}
        errors={errors}
        isConfirm={isConfirm}
        paymentMethod={paymentMethod}
        paymentType={paymentType}
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
        onClickPaymentType={value => setPaymentType(value)}
        backButton={backButton}
        onKeyDownBackButton={onKeyDownBackButton}
        textBackButton={getTextBackButton()}
        disabledPayButton={!validate(numeral(paymentData.pricePlusFee).value())}
        buttonLoading={buttonLoading}
        onClickSubmit={onClickSubmit}
        onClickSubmitConvenience={onClickSubmitConvenience}
        onKeyDownPay={onKeyDownPay}
        textSubmitButton={getTextSubmitButton()}
      />
    </Wrap>
  );
};

export default PaymentInputForm;
