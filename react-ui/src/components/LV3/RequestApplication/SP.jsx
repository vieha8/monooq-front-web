import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import Path from 'config/path';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { Dimens, Colors, ZIndexes } from 'variables';
import { iskeyDownEnter } from 'helpers/keydown';
import { media } from 'helpers/style/media-query';
import { requestActions } from 'redux/modules/request';
import { uiActions } from 'redux/modules/ui';
import LinkCancel from 'components/LV2/Space/LinkCancel';
import SendMessageButton from 'components/LV2/Space/SendMessageButton';
import SendMessageCaption from 'components/LV2/Space/SendMessageCaption';
import Form from './Form';
import ReactGA from 'react-ga';
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
  top: 160px;
  padding: 0 ${Dimens.medium}px 150px;
`;

const SendMessageWrapOuter = styled.div`
  display: none;
  width: 100%;
  min-width: 320px;
  height: fit-content;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: ${ZIndexes.frontPartsOverFooter};
  text-align: center;
  ${props =>
    props.isModal &&
    `
      top: 0;
      display: block;
    `};
  ${media.tablet`
    display: block;
  `};
`;

const SendMessageWrap = styled.div`
  min-width: 320px;
  padding: ${Dimens.small2}px ${Dimens.medium}px;
  background-color: ${Colors.white};
  ${props =>
    props.isModal
      ? `
        border-bottom: 1px solid ${Colors.borderGray};
      `
      : `
        border-top: 1px solid ${Colors.borderGray};
      `};
`;

const SendMessageWrapInnter = styled.div`
  display: flex;
  max-width: 320px;
  margin: auto;
`;

const getRequestSet = (isModal, space, loading, onClick, onKeyDown, disabled, text) => {
  return (
    <SendMessageWrapOuter isModal={isModal}>
      <SendMessageWrap isModal={isModal}>
        <SendMessageWrapInnter>
          <SendMessageCaption priceTatami={space.priceTatami} priceFull={space.priceFull} />
          <SendMessageButton
            isSP
            loading={loading}
            onClick={onClick}
            onKeyDown={onKeyDown}
            disabled={disabled}
            text={text}
          />
        </SendMessageWrapInnter>
      </SendMessageWrap>
    </SendMessageWrapOuter>
  );
};

const RequestApplicationSP = ({
  space,
  loginUser,
  isLogin,
  params,
  isModalOpenSP,
  handleModalOpenSP,
  handleModalCloseSP,
  loading,
  roomId,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
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
    setEndDateMonth =
      params.endDate.month ||
      dayjs()
        .add(1, 'month')
        .month() + 1;
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
    setEndDateMonth =
      dayjs()
        .add(1, 'month')
        .month() + 1;
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
    dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
    history.push(Path.signUp());
  };

  const onClickButton = () => {
    if (isRequested) {
      history.push(`${Path.message(roomId)}?phase=ongoing`);
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

    handleModalOpenSP();
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
        isEndDecided,
      },
    };

    dispatch(requestActions.request(payload));
  };

  const onKeyDownButtonMessage = e => {
    if (iskeyDownEnter(e)) {
      onClickSendMessage();
    }
  };

  return (
    <Wrap>
      {getRequestSet(
        false,
        space,
        loading,
        onClickButton,
        null,
        isSelfSpace,
        getButtonRequestText(isRequested, isLogin, isSelfSpace),
      )}
      <Modal
        size="large"
        open={isModalOpenSP}
        onClose={handleModalCloseSP}
        className="semantic-ui-modal-custom request"
      >
        <Fragment>
          {getRequestSet(
            true,
            space,
            loading,
            isSelfSpace ? null : onClickSendMessage,
            isSelfSpace ? null : onKeyDownButtonMessage,
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
            ),
            '',
          )}
          <Modal.Content scrolling>
            <ContentWrap>
              <Form
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
                    action: '終了月入力',
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
              <LinkCancel handleModalClose={handleModalCloseSP} />
            </ContentWrap>
          </Modal.Content>
        </Fragment>
      </Modal>
    </Wrap>
  );
};

export default RequestApplicationSP;
