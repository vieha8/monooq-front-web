import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import numeral from 'numeral';
import Path from 'config/path';
import { Dimens, FontSizes, Colors, ErrorMessages } from 'variables';
import { media } from 'helpers/style/media-query';
import { iskeyDownEnter } from 'helpers/keydown';
import { isAvailableLocalStorage } from 'helpers/storage';
import { requestActions } from 'redux/modules/request';
import { H1 } from 'components/LV1/Texts/Headline';
import PaidText from 'components/LV2/Payment/PaidText';
import Completed from './Completed';
import InputForm from './InputForm';

dayjs.extend(isSameOrAfter);

const MAX_PAY_PRICE_CONVENIENT = 49999;
const MODE_VIEW_INPUT = 0;
const MODE_VIEW_CONFIRM = 1;
const NAME_LOCAL_STORAGE_PARAMS = 'payment_params';
const FOMAT_DATE = 'YYYY-MM-DD';

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
  ${props =>
    props.errMsg &&
    `
      font-weight: bold;
      color: ${Colors.brandPrimary};
    `};
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
  let defaultYear = dayjs().year();
  let defaultMonth = dayjs().month() + 1;
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
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [modeView, setModeView] = useState(MODE_VIEW_INPUT);

  const { request_id: requestId } = useParams();
  const { message_room_id: roomId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [paidError, isPaymentSuccess]);

  const validate = price => {
    const chkMonth = `${year}-${month}-01`;
    const nowMonth = `${dayjs().year()}-${dayjs().month() + 1}-01`;
    const chkMonthF = dayjs(chkMonth, FOMAT_DATE).format(FOMAT_DATE);
    const nowMonthF = dayjs(nowMonth, FOMAT_DATE).format(FOMAT_DATE);

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
      dayjs(chkMonthF).isSameOrAfter(nowMonthF) &&
      cvc &&
      cvc.match(ValidateRegExp.Cvc)
    );
  };

  const handleChangeUI = (propName, inputValue) => {
    const setError = [];
    let isChangeDate = false;

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

      case 'month':
      case 'year': {
        let targetMonth = month;
        let targetYear = year;
        if (propName === 'month') {
          targetMonth = inputValue;
        } else {
          targetYear = inputValue;
        }
        const chkMonth = `${targetYear}-${targetMonth}-01`;
        const nowMonth = `${dayjs().year()}-${dayjs().month() + 1}-01`;
        const chkMonthF = dayjs(chkMonth, FOMAT_DATE).format(FOMAT_DATE);
        const nowMonthF = dayjs(nowMonth, FOMAT_DATE).format(FOMAT_DATE);

        if (dayjs(chkMonthF).isBefore(nowMonthF)) {
          setError.push(ErrorMessages.LimitCard);
        }
        isChangeDate = true;
        break;
      }

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
    if (isChangeDate) {
      setErrors(state => ({ ...state, [propName]: setError, limitCard: setError }));
    } else {
      setErrors(state => ({ ...state, [propName]: setError }));
    }
  };

  const backButton = () => {
    window.scrollTo(0, 0);
    dispatch(requestActions.paymentPrepare());

    setModeView(MODE_VIEW_INPUT);
    if (modeView === MODE_VIEW_INPUT) {
      history.push(Path.message(roomId));
    } else if (modeView === MODE_VIEW_CONFIRM && !errMsgPayment) {
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
        info: {
          paymentPrice: paymentData.pricePlusFee,
          startDate: paymentData.beginAt,
          endDate: paymentData.endAt,
        },
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
      dispatch(requestActions.paymentConfirm());
      setModeView(MODE_VIEW_CONFIRM);
    }
  };

  const onKeyDownPay = e => {
    if (iskeyDownEnter(e) && validate()) {
      if (modeView === MODE_VIEW_INPUT) {
        confirmButton();
      } else if (modeView === MODE_VIEW_CONFIRM && !errMsgPayment) {
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
    if (modeView === MODE_VIEW_CONFIRM && !errMsgPayment) {
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
    setPaymentMethod(1);
    onClickSubmit();
  };

  const getTextBackButton = () => {
    let textButton = '戻る';
    if (modeView === MODE_VIEW_CONFIRM && !errMsgPayment) {
      if (paymentMethod === 0) {
        textButton = '修正する';
      } else {
        textButton = '戻る';
      }
    }
    return textButton;
  };

  const getTextSubmitButton = () => {
    let textButton = '確認する';
    if (modeView === MODE_VIEW_CONFIRM && !errMsgPayment) {
      textButton = '確定する';
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
        headline = 'お支払いが完了しました';
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
      <H1 bold>{isConfirm ? 'お支払い確認' : 'お支払い'}</H1>
      {errMsgPayment && <TitleCaption errMsg>{errMsgPayment}</TitleCaption>}
      <TitleCaption>
        {isConfirm ? (
          'こちらの内容でよろしければ、お支払いを確定しましょう。'
        ) : (
          <Fragment>
            見積もりを確認し、問題がなければお支払いしましょう。
            <br />
            支払い完了後、スペースの詳細住所をお知らせします。
          </Fragment>
        )}
      </TitleCaption>
      <InputForm
        space={space}
        paymentData={paymentData}
        errors={errors}
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
