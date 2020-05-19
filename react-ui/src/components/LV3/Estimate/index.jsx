import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors, ErrorMessages } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';
import { iskeyDownEnter } from 'helpers/keydown';
import { formatAddComma, formatRemoveComma } from 'helpers/string';
import { isNumber } from 'helpers/validations/number';
import isValidTatami from 'helpers/validations/tatami';
import { isValidSpacePrice } from 'helpers/validations/spacePrice';
import { isTrimmedEmpty } from 'helpers/validations/string';
import { requestActions } from 'redux/modules/request';
import Button from 'components/LV1/Forms/Button';
import { H1 } from 'components/LV1/Texts/Headline';
import InputSchedule from 'components/LV2/Estimate/InputSchedule';
import UsagePeriod from 'components/LV2/Estimate/UsagePeriod';
import ExpectedEndDate from 'components/LV2/Estimate/ExpectedEndDate';
import Tatami from 'components/LV2/Estimate/Tatami';
import Detail from 'components/LV2/Estimate/Detail';

const Validate = {
  UsagePeriod: {
    Max: 24,
    Min: 1,
  },
  Price: {
    Max: 600000,
    Min: 3000,
  },
};

const Wrap = styled.div`
  width: 100%;
  max-width: 375px;
  margin: auto;
`;

const Section = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${props =>
    props.caption &&
    `
    font-size: ${FontSizes.small_12}px;
    color: ${Colors.lightGray10};
    line-height: normal;
  `};
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.phone`
    max-width: 100%;
  `};
`;

const LinkHelpWrap = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const HyperLink = styled.a`
  color: ${Colors.brandPrimary};
  font-size: ${FontSizes.small_15}px;
  &:active {
    color: ${Colors.brandPrimary};
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      color: ${Colors.brandPrimary};
      opacity: 0.8;
    }
  `};
`;

const Estimate = ({ userId, spacePrice, buttonLoading }) => {
  const dispatch = useDispatch();
  const { message_room_id: roomId } = useParams();

  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [startDateFocus, setStartDateFocus] = useState(false);
  const [usagePeriod, setUsagePeriod] = useState('');
  const [isUndecided, setIsUndecided] = useState(false);
  const [priceTatami, setPriceTatami] = useState(
    spacePrice && spacePrice.priceTatami > 0 ? spacePrice.priceTatami : 6000,
  );
  const [priceFull, setPriceFull] = useState(
    spacePrice && spacePrice.priceFull > 0 ? spacePrice.priceFull : 6000,
  );
  const [priceEstimateBase, setPriceEstimateBase] = useState(priceTatami);
  const [tatami, setTatami] = useState('');
  const [indexTatami, setIndexTatami] = useState(0);

  function getPriceEstimate() {
    let tatamiBase = 1;
    if (indexTatami === 0) {
      tatamiBase = tatami;
    }

    const returnPrice =
      !isUndecided && usagePeriod && usagePeriod > 0
        ? priceEstimateBase * tatamiBase * usagePeriod
        : priceEstimateBase * tatamiBase;

    return returnPrice > 0 ? returnPrice : 0;
  }

  const validate = () => {
    const checkPrice = getPriceEstimate();

    // TODO: 利用期間が未定の場合を考慮
    return (
      startDate &&
      (isUndecided ||
        (!isUndecided &&
          usagePeriod &&
          usagePeriod >= Validate.UsagePeriod.Min &&
          usagePeriod <= Validate.UsagePeriod.Max)) &&
      (!tatami || isValidTatami(tatami).result) &&
      checkPrice &&
      checkPrice >= Validate.Price.Min &&
      checkPrice <= Validate.Price.Max
    );
  };

  const checkPriceRenge = () => {
    let msgError = '';
    const checkPrice = getPriceEstimate();
    // console.log(`checkPrice:${checkPrice}`);
    if (checkPrice < Validate.Price.Min) {
      msgError = ErrorMessages.EstimateMin(Validate.Price.Min);
    } else if (checkPrice > Validate.Price.Max) {
      msgError = ErrorMessages.EstimateMax(Validate.Price.Max);
    }
    // console.log(`msgError:${msgError}`);
    return msgError;
  };

  const handleChangeUI = (propName, value) => {
    const setError = [];
    let returnValue = formatRemoveComma(value);

    switch (propName) {
      case 'usagePeriod':
        if (!returnValue || returnValue.length === 0) {
          setError.push(ErrorMessages.PleaseInput);
        } else if (!isNumber(returnValue)) {
          setError.push(ErrorMessages.UsagePeriodNumber);
        } else if (returnValue < Validate.UsagePeriod.Min) {
          setError.push(ErrorMessages.UsagePeriodMin(Validate.UsagePeriod.Min));
        } else if (returnValue > Validate.UsagePeriod.Max) {
          returnValue = 1;
          setError.push(ErrorMessages.UsagePeriodMax(Validate.UsagePeriod.Max));
        }
        break;
      case 'tatami':
        if (!isTrimmedEmpty(Number.toString(returnValue))) {
          const { result, reason } = isValidTatami(returnValue);
          if (!result) {
            setError.push(reason);
          }
        }
        break;
      case 'isUndecided':
        returnValue = value;

        if (!isUndecided) {
          setUsagePeriod('');
        }

        break;
      case 'indexTatami': {
        returnValue = value;

        if (value === 0) {
          setPriceEstimateBase(priceTatami);
        } else {
          setPriceEstimateBase(priceFull);
        }

        break;
      }
      default:
    }

    const msgError = checkPriceRenge();
    if (msgError) {
      const errorPriceRange = [];
      errorPriceRange.push(msgError);
      console.log(`msgError:${msgError}`);
      setErrors(state => ({ ...state, errorPriceRange }));
    } else {
      setErrors(state => ({ ...state, errorPriceRange: '' }));
    }

    setErrors(state => ({ ...state, [propName]: setError }));
  };

  useEffect(() => {
    handleChangeUI('startDate', startDate);
    handleChangeUI('startDateFocus', startDateFocus);
    handleChangeUI('usagePeriod', usagePeriod);
    handleChangeUI('tatami', tatami);
    handleChangeUI('indexTatami', indexTatami);
  }, [startDate, startDateFocus, usagePeriod, tatami, indexTatami]);

  const sendRequest = () => {
    console.log(`userId:${userId}`);
    console.log(`roomId:${roomId}`);
    console.log(`startDate:${startDate.toDate()}`);
    console.log(`usagePeriod:${usagePeriod}`);
    console.log(`isUndecided:${isUndecided}`);
    console.log(`indexTatami:${indexTatami}`);
    console.log(`price:${formatRemoveComma(priceTatami)}`);
    console.log(`price:${formatRemoveComma(priceFull)}`);

    console.log(`priceEstimateBase:${formatRemoveComma(getPriceEstimate())}`);
    console.log(`priceEstimateBase:${String(Math.floor(getPriceEstimate() * 1.1))}`);

    // dispatch(
    //   requestActions.estimate({
    //     userId,
    //     roomId,
    //     startDate: startDate.toDate(),
    //     usagePeriod,
    //     price: formatRemoveComma(price),
    //   }),
    // );
  };

  const onKeyDownSend = e => {
    if (iskeyDownEnter(e) && validate()) {
      sendRequest();
    }
  };

  function onDateChange(date) {
    setStartDate(date);
  }

  function onFocusChangeDatePicker(focus) {
    setStartDateFocus(focus);
  }

  return (
    <Wrap>
      <H1 bold>見積もり作成</H1>
      <Section>
        <InputSchedule
          startDate={startDate}
          startDateFocused={startDateFocus}
          onDateChangeStart={date => onDateChange(date)}
          onFocusChangeStart={focus => onFocusChangeDatePicker(focus)}
          isOnlyBeginDate
        />
      </Section>
      <Section>
        <UsagePeriod
          valueUsagePeriod={usagePeriod}
          onChangeUsagePeriod={v => handleChangeUI('usagePeriod', v, setUsagePeriod(v))}
          isUndecided={isUndecided}
          onChangeUndecided={v => handleChangeUI('isUndecided', v, setIsUndecided(v))}
          errors={errors.usagePeriod}
        />
      </Section>
      {errors.usagePeriod && errors.usagePeriod.length === 0 && (
        <Section>
          <ExpectedEndDate value={usagePeriod} />
        </Section>
      )}
      <Section>
        <Tatami
          errors={errors.tatami}
          spacePrice={spacePrice}
          tatami={tatami}
          onChangeTatami={e => handleChangeUI('tatami', e.target.value, setTatami(e.target.value))}
          indexTatami={indexTatami}
          onClickTatamiMethod={v => handleChangeUI('indexTatami', v, setIndexTatami(v))}
        />
      </Section>
      <Section>
        <Detail price={getPriceEstimate()} errors={errors.errorPriceRange} />
      </Section>
      <Section caption>
        利用金額が変更になった場合、あとから内容を変更して見積もりを再発行することも可能です。
      </Section>
      <Section>
        <ButtonWrap>
          <Button
            primary
            fill={1}
            fontbold
            loading={buttonLoading}
            disabled={!validate()}
            onClick={buttonLoading ? null : sendRequest}
            onKeyDown={onKeyDownSend}
          >
            この見積もりを送信
          </Button>
        </ButtonWrap>
        <LinkHelpWrap>
          <HyperLink
            href="https://help.monooq.com/ja/articles/3694521"
            target="_blank"
            rel="noopener noreferrer"
          >
            見積もりの出し方
          </HyperLink>
        </LinkHelpWrap>
      </Section>
    </Wrap>
  );
};

export default Estimate;
