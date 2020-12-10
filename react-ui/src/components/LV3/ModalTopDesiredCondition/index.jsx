import React, { useState } from 'react';
import 'dayjs/locale/ja';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors, ErrorMessages } from 'variables';
import { requestActions } from 'redux/modules/request';
import { spaceActions } from 'redux/modules/space';
import { media } from 'helpers/style/media-query';
import { iskeyDownSpace } from 'helpers/keydown';
import { getYear, getDate, getToday, generateDateAll } from 'helpers/date';
import { selectOptionPrefectures } from 'helpers/prefectures';
import { isTrimmedEmpty } from 'helpers/validations/string';
import { selectOptionUsages } from 'helpers/usages';
import { wishSelectOptionBreadths } from 'helpers/breadths';
import Button from 'components/LV1/Forms/Button';
import CloseIcon from 'components/LV2/ButtonHeader/CloseIcon';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';
import { checkIsErrorStartDate } from 'components/LV3/RequestApplication/Share';

dayjs.locale('ja');

const CloseIconWrap = styled.div`
  position: absolute;
  top: -${Dimens.medium3}px;
  right: ${Dimens.small2_15}px;
  ${media.tablet`
    top: -${Dimens.medium2_35}px;
  `};
`;

const Title = styled.div`
  text-align: center;
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
  ${props =>
    props.sub &&
    `
    padding: ${Dimens.xxsmall_4}px 0;
    font-size: ${FontSizes.small_12}px;
    font-weight: normal;
    color: ${Colors.lightGray3};
  `};
  ${props =>
    props.caption &&
    `
    margin: ${Dimens.small2}px auto ${Dimens.xxsmall_4}px;
    font-size: ${FontSizes.small_12}px;
    font-weight: normal;
  `};
`;

const FormWrap = styled.div`
  margin: auto;
`;

const Row = styled.div`
  padding: ${Dimens.small2_14}px 0 0;
`;

const DataSelectTitle = styled.div`
  font-size: ${FontSizes.small_15}px;
  line-height: normal;
  font-weight: bold;
`;

const DateSelectWrap = styled.div`
  display: flex;
  margin-bottom: ${Dimens.small}px;
`;

const ButtonWrap = styled.div`
  margin: ${Dimens.medium_20}px auto auto;
`;

const getSelectDate = (option, value, onChange) => {
  return <Select options={option} value={value} onChange={onChange} width="100%" isInline />;
};

const ModalTopDesiredCondition = ({ params, isLoading }) => {
  const dispatch = useDispatch();
  const [isOpen, setStateOpen] = useState(true);
  const [errors, setErrors] = useState({});
  const [prefCode, setPrefCode] = useState(params ? params.prefCode : 0);
  const [city, setCity] = useState(params ? params.city : '');
  const [usage, setUsage] = useState(params ? params.usage : 0);
  const [isUseOver6Month, setIsUseOver6Month] = useState(params ? params.isUseOver6Month : false);
  const [breadth, setBreadth] = useState(params ? params.breadth : 0);
  const cities = useSelector(state => state.space.cities);

  let setStartDateYear;
  let setStartDateMonth;
  let setStartDateDay;
  if (params) {
    setStartDateYear = params.startDate.year || dayjs().year();
    setStartDateMonth = params.startDate.month || dayjs().month() + 1;
    setStartDateDay = params.startDate.day || dayjs().date();
  }
  if (!params || checkIsErrorStartDate(setStartDateYear, setStartDateMonth, setStartDateDay)) {
    setStartDateYear = dayjs().year();
    setStartDateMonth = dayjs().month() + 1;
    setStartDateDay = dayjs().date();
  }
  const [startDate, setStartDate] = useState({
    year: setStartDateYear,
    month: setStartDateMonth,
    day: setStartDateDay,
  });

  const onClickSubmit = () => {
    dispatch(spaceActions.resetSearch());
    dispatch(
      requestActions.bosyu({
        body: {
          prefCode,
          city: city === undefined ? '' : city.trim(),
          usage,
          startDate,
          isUseOver6Month,
          breadth,
        },
      }),
    );
  };

  const handleChangeUI = (propName, inputValue) => {
    const setError = [];

    switch (propName) {
      case 'prefCode':
      case 'usage':
      case 'breadth':
        if (inputValue.length === 0) {
          setError.push(ErrorMessages.PleaseSelect);
        }
        setErrors(state => ({ ...state, [propName]: setError }));
        break;
      case 'city':
        if (isTrimmedEmpty(inputValue)) {
          setError.push(ErrorMessages.PleaseInput);
        }
        setErrors(state => ({ ...state, [propName]: setError }));
        break;
      default:
        break;
    }
  };

  const handleChangeDate = (propName, inputValue, setItem) => {
    const setError = [];

    let startDateYear = startDate.year;
    let startDateMonth = startDate.month;
    let startDateDay = startDate.day;

    switch (propName) {
      case 'year':
        startDateYear = inputValue;
        break;
      case 'month':
        startDateMonth = inputValue;
        break;
      case 'day':
        startDateDay = inputValue;
        break;
      default:
        break;
    }
    setItem(state => ({ ...state, [propName]: inputValue }));

    const startDateAll = generateDateAll(startDateYear, startDateMonth, startDateDay);
    if (dayjs(startDateAll).isValid()) {
      if (dayjs(startDateAll).isBefore(getToday())) {
        setError.push(ErrorMessages.InvalidStartDate);
      }
    } else {
      setError.push(ErrorMessages.InvalidDate);
    }
    setErrors(state => ({ ...state, desiredPeriod: setError }));
  };

  const validate = () => {
    const startDateAll = generateDateAll(startDate.year, startDate.month, startDate.day);
    return (
      prefCode &&
      !isTrimmedEmpty(city) &&
      usage &&
      breadth &&
      dayjs(startDateAll).isValid() &&
      !dayjs(startDateAll).isBefore(getToday())
    );
  };

  const onChangePrefecture = value => {
    handleChangeUI('prefCode', value, setPrefCode(value));
    dispatch(
      spaceActions.getCities({
        prefCode: value,
      }),
    );
  };

  return (
    <Modal
      size="large"
      open={isOpen}
      onClose={() => setStateOpen(false)}
      className="semantic-ui-modal-custom-top"
    >
      <Modal.Content>
        <CloseIconWrap>
          <CloseIcon onClick={() => setStateOpen(false)} />
        </CloseIconWrap>
        <Title sub>空きスペースをお探しですか？</Title>
        <Title>希望条件を教えてください</Title>
        <Title caption>
          ご入力内容に応じて、
          <br />
          希望に近いスペースをご紹介します。
        </Title>
        <FormWrap>
          <Row>
            <Select
              label="預けたい都道府県"
              options={selectOptionPrefectures('選択してください')}
              onChange={e => onChangePrefecture(e.target.value)}
              value={prefCode}
            />
            <ErrorList keyName="prefCode_errors" errors={errors.prefCode} />
          </Row>
          {cities && cities.length > 0 && (
            <Row>
              <Select
                label="預けたい市区町村"
                options={cities.map((item, i) => ({
                  key: i,
                  value: item.name,
                  text: item.name,
                }))}
                onChange={e => handleChangeUI('city', e.target.value, setCity(e.target.value))}
                value={city}
              />
              <ErrorList keyName="city_errors" errors={errors.city} />
            </Row>
          )}
          <Row>
            <Select
              label="用途"
              options={selectOptionUsages('選択してください')}
              onChange={e => handleChangeUI('usage', e.target.value, setUsage(e.target.value))}
              value={usage}
            />
            <ErrorList keyName="usage_errors" errors={errors && errors.usage} />
          </Row>
          <Row date>
            <DataSelectTitle>開始希望日</DataSelectTitle>
            <DateSelectWrap>
              {getSelectDate(getYear(5), startDate && startDate.year, e =>
                handleChangeDate('year', e.target.value, setStartDate),
              )}
              {getSelectDate(getDate(12, '月'), startDate && startDate.month, e =>
                handleChangeDate('month', e.target.value, setStartDate),
              )}
              {getSelectDate(getDate(31, '日'), startDate && startDate.day, e =>
                handleChangeDate('day', e.target.value, setStartDate),
              )}
            </DateSelectWrap>
            <InputForm
              checkbox
              fontSize={14}
              labelCheckBox="半年以上の利用希望"
              checked={isUseOver6Month}
              onClickCheck={() => setIsUseOver6Month(!isUseOver6Month)}
              onKeyDown={e =>
                iskeyDownSpace(e) ? () => setIsUseOver6Month(!isUseOver6Month) : null
              }
            />
            <ErrorList keyName="desiredPeriod_errors" errors={errors && errors.desiredPeriod} />
          </Row>
          <Row>
            <Select
              label="希望の広さ"
              options={wishSelectOptionBreadths('', '選択してください')}
              value={breadth}
              onChange={e => handleChangeUI('breadth', e.target.value, setBreadth(e.target.value))}
            />
            <ErrorList keyName="breadth_errors" errors={errors && errors.breadth} />
          </Row>
        </FormWrap>
        <ButtonWrap>
          <Button
            primary
            fill={1}
            fontbold
            disabled={!validate()}
            onClick={isLoading ? null : () => onClickSubmit()}
            loading={isLoading}
          >
            完了
          </Button>
        </ButtonWrap>
      </Modal.Content>
    </Modal>
  );
};

export default ModalTopDesiredCondition;
