import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import { getYear, getDate } from 'helpers/date';
import { selectOptionUsages } from 'helpers/usages';
import {
  selectOptionBreadths,
  getBreadthsDetailRoom,
  getBreadthsDetailOther,
} from 'helpers/breadths';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';

const Wrap = styled.div`
  margin: auto;
  max-width: 1000px;
`;

const Title = styled.div`
  margin: ${Dimens.medium_20} auto ${Dimens.medium_20}px;
  text-align: center;
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
  ${props =>
    props.isTopBar &&
    `
    margin-top: ${Dimens.medium}px;
    padding-top: ${Dimens.medium2_32}px;
    border-top: 1px solid ${Colors.borderGray};
  `};
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
`;

const getSelectDate = (option, value, onChange) => {
  return <Select options={option} value={value} onChange={onChange} width="100%" isInline />;
};

const getBreadths = (sizeType, targetBreadth) => {
  let returnBreadths = 0;
  if (sizeType > 0 && sizeType < 4 && getBreadthsDetailRoom(targetBreadth)) {
    returnBreadths = targetBreadth;
  } else if (getBreadthsDetailOther(targetBreadth)) {
    returnBreadths = targetBreadth;
  }
  return returnBreadths;
};

export default ({
  isTopBar,
  errors,
  sizeType,
  usage,
  onChangeUsage,
  startDate,
  onCHangeStartDateYear,
  onCHangeStartDateMonth,
  onCHangeStartDateDay,
  endDate,
  onCHangeEndDateYear,
  onCHangeEndDateMonth,
  onCHangeEndDateDay,
  breadth,
  onChangeBreadth,
  packageContents,
  onChangePackageContents,
  existPhoneNumber,
  phoneNumber,
  onChangePhoneNumber,
  notes,
  onChangeNotes,
  isEndDecided,
  onChangeIsEndDecided,
}) => (
  <Fragment>
    <Title isTopBar={isTopBar}>リクエスト内容</Title>
    <Wrap>
      <Row>
        <Select
          label="用途"
          options={selectOptionUsages('選択してください')}
          onChange={onChangeUsage}
          value={usage}
        />
        <ErrorList keyName="usage_errors" errors={errors && errors.usage} />
      </Row>
      <Row date>
        <DataSelectTitle>利用開始日</DataSelectTitle>
        <DateSelectWrap>
          {getSelectDate(getYear(5), startDate && startDate.year, onCHangeStartDateYear)}
          {getSelectDate(getDate(12, '月'), startDate && startDate.month, onCHangeStartDateMonth)}
          {getSelectDate(getDate(31, '日'), startDate && startDate.day, onCHangeStartDateDay)}
        </DateSelectWrap>
      </Row>
      <Row date>
        <DataSelectTitle>利用終了日</DataSelectTitle>
        <DateSelectWrap>
          {getSelectDate(getYear(5), endDate && endDate.year, onCHangeEndDateYear)}
          {getSelectDate(getDate(12, '月'), endDate && endDate.month, onCHangeEndDateMonth)}
          {getSelectDate(getDate(31, '日'), endDate && endDate.day, onCHangeEndDateDay)}
        </DateSelectWrap>
        <ErrorList keyName="desiredPeriod_errors" errors={errors && errors.desiredPeriod} />
      </Row>
      <Row>
        <input checked={!isEndDecided} onChange={onChangeIsEndDecided} type="checkbox" />
        終了日未定
      </Row>
      <Row>
        <Select
          label="希望の広さ"
          options={selectOptionBreadths(
            sizeType > 0 && sizeType < 4 ? 'room' : 'other',
            '選択してください',
          )}
          value={getBreadths(sizeType, breadth)}
          onChange={onChangeBreadth}
        />
        <ErrorList keyName="breadth_errors" errors={errors && errors.breadth} />
      </Row>
      <Row>
        <InputForm
          label="荷物内容"
          placeholder="冷蔵庫、洗濯機、段ボール4箱..."
          rows={3}
          multiline
          onChange={onChangePackageContents}
          value={packageContents}
        />
        <ErrorList keyName="package_contents_errors" errors={errors && errors.packageContents} />
      </Row>
      {!existPhoneNumber && (
        <Row>
          <InputForm
            label="電話番号"
            placeholder="09012345678"
            onChange={onChangePhoneNumber}
            value={phoneNumber || ''}
            type="tel"
            name="tel"
            autoComplete="tel"
          />
          <ErrorList keyName="phoneNumber_errors" errors={errors && errors.phoneNumber} />
        </Row>
      )}
      <Row>
        <InputForm
          label="備考"
          labelSub="任意"
          placeholder="ホストへの連絡事項など"
          rows={3}
          multiline
          onChange={onChangeNotes}
          value={notes}
        />
        <ErrorList keyName="notes_errors" errors={errors && errors.notes} />
      </Row>
    </Wrap>
  </Fragment>
);
