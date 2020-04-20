import React, { Fragment, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { isAvailableLocalStorage } from 'helpers/storage';
import { media } from 'helpers/style/media-query';
import { getYear, getDate } from 'helpers/date';
import { selectOptionUsages } from 'helpers/usages';
import {
  selectOptionBreadths,
  getBreadthsDetailRoom,
  getBreadthsDetailOther,
} from 'helpers/breadths';
import Button from 'components/LV1/Forms/Button';
import CloseIcon from 'components/LV2/ButtonHeader/CloseIcon';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';
import { checkIsErrorStartDate } from 'components/LV3/RequestApplication/Share';

moment.locale('ja');

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

const getBreadths = (sizeType, targetBreadth) => {
  let returnBreadths = 0;
  if (sizeType > 0 && sizeType < 4 && getBreadthsDetailRoom(targetBreadth)) {
    returnBreadths = targetBreadth;
  } else if (getBreadthsDetailOther(targetBreadth)) {
    returnBreadths = targetBreadth;
  }
  return returnBreadths;
};

const getSelectDate = (option, value, onChange) => {
  return <Select options={option} value={value} onChange={onChange} width="100%" isInline />;
};

const ModalTopDesiredCondition = ({ params, content }) => {
  const [isOpen, setStateOpen] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [errors, setErrors] = useState({});
  const [usage, setUsage] = useState(params ? params.usage : 0);
  const [isUseOver6Month, setIsUseOver6Month] = useState(params ? params.isUseOver6Month : false);
  const [breadth, setBreadth] = useState(params ? params.breadth : 0);

  let setStartDateYear;
  let setStartDateMonth;
  let setStartDateDay;
  if (params) {
    setStartDateYear = params.startDate.year || moment().year();
    setStartDateMonth = params.startDate.month || moment().month() + 1;
    setStartDateDay = params.startDate.day || moment().date();
  }
  if (!params || checkIsErrorStartDate(setStartDateYear, setStartDateMonth, setStartDateDay)) {
    setStartDateYear = moment().year();
    setStartDateMonth = moment().month() + 1;
    setStartDateDay = moment().date();
  }
  const [startDate, setStartDate] = useState({
    year: setStartDateYear,
    month: setStartDateMonth,
    day: setStartDateDay,
  });

  const onClickButton = () => {
    dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
    history.push(Path.profileEdit());
  };

  const onClickButtonDelLocalStorage = targetName => {
    if (isAvailableLocalStorage()) {
      localStorage.removeItem(targetName);
      console.log(`Local Storage「${targetName}」を削除しました`);
    }
  };

  const sizeType = 1;

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
              label="預けたい希望地域"
              options={selectOptionUsages('選択してください')}
              // onChange={onChangeUsage}
              value={usage}
            />
            <ErrorList keyName="usage_errors" errors={errors && errors.usage} />
          </Row>
          <Row>
            <Select
              label="用途"
              options={selectOptionUsages('選択してください')}
              // onChange={onChangeUsage}
              value={usage}
            />
            <ErrorList keyName="usage_errors" errors={errors && errors.usage} />
          </Row>
          <Row date>
            <DataSelectTitle>開始希望日</DataSelectTitle>
            <DateSelectWrap>
              {/* {getSelectDate(getYear(5), startDate && startDate.year, onCHangeStartDateYear)}
              {getSelectDate(getDate(12, '月'), startDate && startDate.month, onCHangeStartDateMonth)}
              {getSelectDate(getDate(31, '日'), startDate && startDate.day, onCHangeStartDateDay)}
               */}
              {getSelectDate(getYear(5), startDate && startDate.year, null)}
              {getSelectDate(getDate(12, '月'), startDate && startDate.month, null)}
              {getSelectDate(getDate(31, '日'), startDate && startDate.day, null)}
            </DateSelectWrap>
            <InputForm
              checkbox
              fontSize={14}
              labelCheckBox="半年以上の利用を希望"
              checked={isUseOver6Month}
              // onClickCheck={() => setNoticeEmail(!isNoticeEmail)}
              // onKeyDown={e => (iskeyDownSpace(e) ? () => setNoticeEmail(!isNoticeEmail) : null)}
            />
          </Row>
          <Row>
            <Select
              label="希望の広さ"
              options={selectOptionBreadths(
                sizeType > 0 && sizeType < 4 ? 'room' : 'other',
                '選択してください',
              )}
              value={getBreadths(sizeType, breadth)}
              // onChange={onChangeBreadth}
            />
            <ErrorList keyName="breadth_errors" errors={errors && errors.breadth} />
          </Row>
        </FormWrap>
        <ButtonWrap>
          <Button
            primary
            fill={1}
            fontbold
            // disabled={!validate()}
            onClick={() => onClickButton()}
          >
            完了
          </Button>
        </ButtonWrap>
        {process.env.NODE_ENV !== 'production' && (
          <Fragment>
            <ButtonWrap>
              <Button
                secondary
                fill={1}
                onClick={() => onClickButtonDelLocalStorage('isRequestedTop')}
              >
                LS削除(希望送信済み状態)(開発用)
              </Button>
            </ButtonWrap>
            <ButtonWrap>
              <Button
                secondary
                fill={1}
                onClick={() => onClickButtonDelLocalStorage('request_params')}
              >
                LS削除(ReqForm保存値)(開発用)
              </Button>
            </ButtonWrap>
          </Fragment>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ModalTopDesiredCondition;
