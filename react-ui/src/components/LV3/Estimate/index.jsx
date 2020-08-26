import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import { iskeyDownEnter } from 'helpers/keydown';
import { formatAddComma, formatRemoveComma } from 'helpers/string';
import { Validate as ValidatePrice, isValidSpacePrice } from 'helpers/validations/spacePrice';
import { requestActions } from 'redux/modules/request';
import Button from 'components/LV1/Forms/Button';
import { H1 } from 'components/LV1/Texts/Headline';
import HyperLink from 'components/LV1/Texts/HyperLink';
import Hr from 'components/LV1/HorizontalRule';
import InputSchedule from 'components/LV2/Estimate/InputSchedule';
import InputPrice from 'components/LV2/Estimate/InputPrice';
import Detail from 'components/LV2/Estimate/Detail';

moment.locale('ja');

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

const CaptionBasePrice = styled.div`
  width: fit-content;
  margin-top: ${Dimens.small_10}px;
  padding: ${Dimens.xxsmall_5}px;
  font-size: ${FontSizes.small_13}px;
  line-height: normal;
  color: ${Colors.darkGray1};
  background-color: ${Colors.lightGray1Bg};
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

const Estimate = ({ userId, priceTatami, priceFull, isTakelateBefore, buttonLoading }) => {
  const dispatch = useDispatch();
  const { message_room_id: roomId } = useParams();

  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [startDateFocus, setStartDateFocus] = useState(false);
  const [price, setPrice] = useState('');

  const validate = () => {
    return (
      startDate && price && price >= ValidatePrice.Price.Min && price <= ValidatePrice.Price.Max
    );
  };

  const handleChangeUI = (propName, value) => {
    const setError = [];
    switch (propName) {
      case 'price': {
        const newPrice = formatRemoveComma(value);
        const { reason, result } = isValidSpacePrice(newPrice);
        if (!result) {
          setError.push(reason);
        }
        break;
      }
      default:
    }
    setErrors(state => ({ ...state, [propName]: setError }));
  };

  const sendRequest = () => {
    const datedStartDate = startDate.toDate();
    const datedEndDate = moment(datedStartDate)
      .add(1, 'months')
      .subtract(1, 'days')
      .toDate();

    dispatch(
      requestActions.estimate({
        userId,
        roomId,
        startDate: datedStartDate,
        endDate: datedEndDate,
        price: formatRemoveComma(price),
      }),
    );
  };

  const onKeyDownSend = e => {
    if (iskeyDownEnter(e) && validate()) {
      sendRequest();
    }
  };

  return (
    <Wrap>
      <H1 bold>見積もり作成</H1>
      <Section>
        <InputSchedule
          startDate={startDate}
          startDateFocused={startDateFocus}
          onDateChangeStart={date => setStartDate(date)}
          onFocusChangeStart={focus => setStartDateFocus(focus)}
          isOnlyBeginDate
        />
      </Section>
      <Section>
        <InputPrice
          price={price}
          onChange={v => handleChangeUI('price', v, setPrice(formatRemoveComma(v)))}
          errors={errors.price}
        />
        {(priceTatami > 0 || priceFull > 0) && (
          <CaptionBasePrice>
            {priceTatami && priceTatami > 0
              ? `あなたの登録料金は1畳につき${formatAddComma(priceTatami)}円です。`
              : `あなたの登録料金は全てのスペースで${formatAddComma(priceFull)}円です。`}
          </CaptionBasePrice>
        )}
      </Section>
      <Hr margin="25px 0" />
      <Section>
        <Detail price={price} isTakelateBefore={isTakelateBefore} />
      </Section>
      <Section caption>
        ゲストが支払うとスペース利用契約が成立し、利用開始日から1ヶ月毎に利用料が自動支払いされます。
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
