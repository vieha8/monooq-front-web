import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import Path from 'config/path';
import { Colors } from 'variables';
import { iskeyDownEnter } from 'helpers/keydown';
import { requestActions } from 'redux/modules/request';
import { uiActions } from 'redux/modules/ui';
import Button from 'components/LV1/Forms/Button';
import LinkCancel from 'components/LV2/Space/LinkCancel';
import SendMessageButton from 'components/LV2/Space/SendMessageButton';
import amplitude from 'amplitude-js/amplitude';
import Form from './Form';
import {
  handleChangeUI,
  handleChangeDate,
  validate,
  checkIsErrorStartDate,
  checkIsErrorEndDate,
  getButtonRequestText,
} from './Share';

moment.locale('ja');

const Wrap = styled.div`
  text-align: left;
  color: ${Colors.black};
`;

const ContentWrap = styled.div`
  max-width: 768px;
  margin: auto;
  position: relative;
`;

// TODO: SPと記述が重複している箇所は共通化したい。
const RequestApplication = ({
  space,
  loginUser,
  isLogin,
  confirm,
  params,
  isModalOpen,
  handleModalOpen,
  handleModalClose,
  loading,
  isRequested,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isSelfSpace = loginUser.id === (space.user || {}).id;
  const existPhoneNumber = !!loginUser.phoneNumber;

  const [errors, setErrors] = useState({});
  const [usage, setUsage] = useState(params ? params.usage : 0);
  const [breadth, setBreadth] = useState(params ? params.breadth : 0);
  const [packageContents, setPackageContents] = useState(params ? params.packageContents : '');
  const [phoneNumber, setPhoneNumber] = useState(params ? params.phoneNumber : '');
  const [notes, setNotes] = useState(params ? params.notes : '');

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

  let setEndDateYear;
  let setEndDateMonth;
  let setEndDateDay;
  if (params) {
    setEndDateYear = params.endDate.year || moment().year();
    setEndDateMonth = params.endDate.month || moment().month() + 2;
    setEndDateDay = params.endDate.day || '1';
  }
  if (
    !params ||
    checkIsErrorEndDate(
      setStartDateYear,
      setStartDateMonth,
      setStartDateDay,
      setEndDateYear,
      setEndDateMonth,
      setEndDateDay,
    )
  ) {
    setEndDateYear = moment().year();
    setEndDateMonth = moment().month() + 2;
    setEndDateDay = moment().date();
  }
  const [endDate, setEndDate] = useState({
    year: setEndDateYear,
    month: setEndDateMonth,
    day: setEndDateDay,
  });

  const handleSignUp = () => {
    dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
    history.push(Path.signUp());
  };

  const onClickButton = () => {
    if (!isLogin) {
      amplitude.getInstance().logEvent('リクエスト - リクエストボタンをクリック（非ログイン）', {
        spaceId: space.id,
      });
      handleSignUp();
      return;
    }

    amplitude.getInstance().logEvent('リクエスト - リクエストボタンをクリック（ログイン）', {
      spaceId: space.id,
    });

    handleModalOpen();
  };

  const onClickSendMessage = () => {
    if (!isLogin) {
      dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
      history.push(Path.login());
      return;
    }

    const payload = {
      user: loginUser,
      space,
      body: {
        usage,
        breadth,
        packageContents,
        phoneNumber: !existPhoneNumber ? phoneNumber : '',
        notes,
        startDate,
        endDate,
      },
    };

    amplitude.getInstance().logEvent('リクエスト - リクエスト申請クリック', payload);
    dispatch(requestActions.request(payload));
  };

  const onKeyDownButtonMessage = e => {
    if (iskeyDownEnter(e)) {
      onClickSendMessage();
    }
  };

  return (
    <Wrap>
      {isModalOpen ? (
        <ContentWrap>
          <Form
            isTopBar={isModalOpen}
            errors={errors}
            sizeType={space.sizeType}
            usage={usage}
            onChangeUsage={e => handleChangeUI('usage', e.target.value, setUsage, setErrors)}
            startDate={startDate}
            onCHangeStartDateYear={e =>
              handleChangeDate(
                'startDate',
                'year',
                e.target.value,
                setStartDate,
                setErrors,
                startDate,
                endDate,
              )
            }
            onCHangeStartDateMonth={e =>
              handleChangeDate(
                'startDate',
                'month',
                e.target.value,
                setStartDate,
                setErrors,
                startDate,
                endDate,
              )
            }
            onCHangeStartDateDay={e =>
              handleChangeDate(
                'startDate',
                'day',
                e.target.value,
                setStartDate,
                setErrors,
                startDate,
                endDate,
              )
            }
            endDate={endDate}
            onCHangeEndDateYear={e =>
              handleChangeDate(
                'endDate',
                'year',
                e.target.value,
                setEndDate,
                setErrors,
                startDate,
                endDate,
              )
            }
            onCHangeEndDateMonth={e =>
              handleChangeDate(
                'endDate',
                'month',
                e.target.value,
                setEndDate,
                setErrors,
                startDate,
                endDate,
              )
            }
            onCHangeEndDateDay={e =>
              handleChangeDate(
                'endDate',
                'day',
                e.target.value,
                setEndDate,
                setErrors,
                startDate,
                endDate,
              )
            }
            breadth={breadth}
            onChangeBreadth={e => handleChangeUI('breadth', e.target.value, setBreadth, setErrors)}
            packageContents={packageContents}
            onChangePackageContents={e =>
              handleChangeUI('packageContents', e.target.value, setPackageContents, setErrors)
            }
            existPhoneNumber={existPhoneNumber}
            phoneNumber={phoneNumber}
            onChangePhoneNumber={e =>
              handleChangeUI('phoneNumber', e.target.value, setPhoneNumber, setErrors)
            }
            notes={notes}
            onChangeNotes={e => handleChangeUI('notes', e.target.value, setNotes, setErrors)}
          />
          <SendMessageButton
            loading={loading}
            onClick={isSelfSpace ? null : onClickSendMessage}
            onKeyDown={isSelfSpace ? null : onKeyDownButtonMessage}
            disabled={
              !validate(
                startDate,
                endDate,
                usage,
                space.sizeType,
                breadth,
                packageContents,
                existPhoneNumber,
                phoneNumber,
                notes,
              )
            }
            handleModalClose={handleModalClose}
          />
          <LinkCancel handleModalClose={handleModalClose} />
        </ContentWrap>
      ) : (
        <Button
          fontSize={14}
          primary
          borderbold
          fontbold
          fill={1}
          disabled={isRequested || confirm || isSelfSpace}
          onClick={onClickButton}
        >
          {getButtonRequestText(isRequested, isLogin)}
        </Button>
      )}
    </Wrap>
  );
};

export default RequestApplication;
