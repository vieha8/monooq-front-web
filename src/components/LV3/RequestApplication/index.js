import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import ReactGA from 'react-ga';
import Path from 'config/path';
import { Colors } from 'variables';
import { iskeyDownEnter } from 'helpers/keydown';
import { requestActions } from 'redux/modules/request';
import { userActions } from 'redux/modules/user';
import { uiActions } from 'redux/modules/ui';
import Button from 'components/LV1/Forms/Button';
import LinkCancel from 'components/LV2/Space/LinkCancel';
import SendMessageButton from 'components/LV2/Space/SendMessageButton';
import Form from './Form';
import {
  handleChangeUI,
  handleChangeDate,
  validate,
  checkIsErrorStartDate,
  checkIsErrorEndDate,
  getButtonRequestText,
} from './Share';

dayjs.locale('ja');

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
  router,
  space,
  loginUser,
  isLogin,
  params,
  isModalOpen,
  handleModalOpen,
  handleModalClose,
  loading,
  roomId,
}) => {
  const dispatch = useDispatch();
  const isSelfSpace = loginUser.id === (space.user || {}).id;
  const existPhoneNumber = !!loginUser.phoneNumber;
  const isRequested = !!roomId;

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

  let setEndDateYear;
  let setEndDateMonth;
  let setEndDateDay;
  if (params) {
    setEndDateYear = params.endDate.year || dayjs().year();
    setEndDateMonth = params.endDate.month || dayjs().add(1, 'month').month() + 1;
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
    setEndDateYear = dayjs().year();
    setEndDateMonth = dayjs().add(1, 'month').month() + 1;
    setEndDateDay = dayjs().date();
  }
  const [endDate, setEndDate] = useState({
    year: setEndDateYear,
    month: setEndDateMonth,
    day: setEndDateDay,
  });
  const [isEndDecided, setIsEndDecided] = useState(
    params && params.isEndDecided !== undefined ? params.isEndDecided : true,
  );

  const handleSignUp = () => {
    dispatch(uiActions.setUiState({ redirectPath: router.pathname }));
    router.push(Path.signUp());
  };

  const onClickButton = () => {
    if (isRequested) {
      router.push(Path.message(roomId));
      return;
    }

    if (!isLogin) {
      ReactGA.event({
        category: 'リクエスト',
        action: 'リクエストボタンをクリック（非ログイン）',
      });
      handleSignUp();
      return;
    }

    ReactGA.event({
      category: 'リクエスト',
      action: 'リクエストボタンをクリック（ログイン）',
    });

    handleModalOpen();
  };

  const onClickSendMessage = () => {
    if (!isLogin) {
      dispatch(uiActions.setUiState({ redirectPath: router.pathname }));
      router.push(Path.login());
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
        isEndDecided,
      },
    };

    dispatch(requestActions.request(payload));

    if (!existPhoneNumber && phoneNumber) {
      dispatch(
        userActions.updateUser({
          userId: loginUser.id,
          body: {
            phoneNumber,
          },
        }),
      );
    }
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
            onChangeUsage={e => {
              ReactGA.event({
                category: 'リクエスト',
                action: '用途入力',
                value: e.target.value,
              });

              return handleChangeUI('usage', e.target.value, setUsage, setErrors);
            }}
            startDate={startDate}
            onCHangeStartDateYear={e => {
              ReactGA.event({
                category: 'リクエスト',
                action: '開始年入力',
                value: e.target.value,
              });

              return handleChangeDate(
                'startDate',
                'year',
                e.target.value,
                setStartDate,
                setErrors,
                startDate,
                endDate,
              );
            }}
            onCHangeStartDateMonth={e => {
              ReactGA.event({
                category: 'リクエスト',
                action: '開始月入力',
                value: e.target.value,
              });

              return handleChangeDate(
                'startDate',
                'month',
                e.target.value,
                setStartDate,
                setErrors,
                startDate,
                endDate,
              );
            }}
            onCHangeStartDateDay={e => {
              ReactGA.event({
                category: 'リクエスト',
                action: '開始日入力',
                value: e.target.value,
              });

              return handleChangeDate(
                'startDate',
                'day',
                e.target.value,
                setStartDate,
                setErrors,
                startDate,
                endDate,
              );
            }}
            endDate={endDate}
            onCHangeEndDateYear={e => {
              ReactGA.event({
                category: 'リクエスト',
                action: '終了年入力',
                value: e.target.value,
              });

              return handleChangeDate(
                'endDate',
                'year',
                e.target.value,
                setEndDate,
                setErrors,
                startDate,
                endDate,
              );
            }}
            onCHangeEndDateMonth={e => {
              ReactGA.event({
                category: 'リクエスト',
                action: '開始月入力',
                value: e.target.value,
              });

              return handleChangeDate(
                'endDate',
                'month',
                e.target.value,
                setEndDate,
                setErrors,
                startDate,
                endDate,
              );
            }}
            onCHangeEndDateDay={e => {
              ReactGA.event({
                category: 'リクエスト',
                action: '終了日入力',
                value: e.target.value,
              });

              return handleChangeDate(
                'endDate',
                'day',
                e.target.value,
                setEndDate,
                setErrors,
                startDate,
                endDate,
              );
            }}
            breadth={breadth}
            onChangeBreadth={e => {
              ReactGA.event({
                category: 'リクエスト',
                action: '希望広さ入力',
                value: e.target.value,
              });

              return handleChangeUI('breadth', e.target.value, setBreadth, setErrors);
            }}
            packageContents={packageContents}
            onChangePackageContents={e => {
              ReactGA.event({
                category: 'リクエスト',
                action: '荷物内容入力',
                value: e.target.value,
              });

              return handleChangeUI(
                'packageContents',
                e.target.value,
                setPackageContents,
                setErrors,
              );
            }}
            existPhoneNumber={existPhoneNumber}
            phoneNumber={phoneNumber}
            onChangePhoneNumber={e => {
              ReactGA.event({
                category: 'リクエスト',
                action: '電話番号入力',
                value: e.target.value,
              });

              return handleChangeUI('phoneNumber', e.target.value, setPhoneNumber, setErrors);
            }}
            notes={notes}
            onChangeNotes={e => {
              ReactGA.event({
                category: 'リクエスト',
                action: '備考入力',
                value: e.target.value,
              });

              return handleChangeUI('notes', e.target.value, setNotes, setErrors);
            }}
            isEndDecided={isEndDecided}
            onChangeIsEndDecided={bool => {
              ReactGA.event({
                category: 'リクエスト',
                action: '終了日未定入力',
                value: bool,
              });

              return handleChangeUI('isEndDecided', !bool, setIsEndDecided, setErrors);
            }}
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
                isEndDecided,
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
          disabled={isSelfSpace}
          onClick={onClickButton}
        >
          {getButtonRequestText(isRequested, isLogin, isSelfSpace)}
        </Button>
      )}
    </Wrap>
  );
};

export default RequestApplication;
