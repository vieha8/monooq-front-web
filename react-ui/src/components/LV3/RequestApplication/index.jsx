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
import { loggerActions } from 'redux/modules/logger';
import { uiActions } from 'redux/modules/ui';
import Button from 'components/LV1/Forms/Button';
import LinkCancel from 'components/LV2/Space/LinkCancel';
import SendMessageButton from 'components/LV2/Space/SendMessageButton';
import Form from './Form';
import { handleChangeUI, handleChangeDate, validate } from './Share';

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
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isSelfSpace = loginUser.id === (space.user || {}).id;

  const [errors, setErrors] = useState({});
  const [usage, setUsage] = useState(params ? params.usage : 0);
  const [breadth, setBreadth] = useState(params ? params.breadth : 0);
  const [packageContents, setPackageContents] = useState(params ? params.packageContents : '');
  const [notes, setNotes] = useState(params ? params.notes : '');
  const [startDate, setStartDate] = useState(
    params
      ? {
          year: params.startDate.year || moment().year(),
          month: params.startDate.month || moment().month() + 1,
          day: params.startDate.day || moment().date(),
        }
      : {
          year: moment().year(),
          month: moment().month() + 1,
          day: moment().date(),
        },
  );
  const [endDate, setEndDate] = useState(
    params
      ? {
          year: params.endDate.year || moment().year(),
          month: params.endDate.month || moment().month() + 1,
          day: params.endDate.day || moment().date(),
        }
      : {
          year: moment().year(),
          month: moment().month() + 2,
          day: 1,
        },
  );

  const handleSignUp = () => {
    dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
    history.push(Path.signUp());
  };

  const onClickButton = () => {
    if (!isLogin) {
      handleSignUp();
      return;
    }

    dispatch(
      loggerActions.recordEvent({
        event: 'space_request_click',
        detail: { spaceId: space.id },
      }),
    );

    handleModalOpen();
  };

  const onClickSendMessage = () => {
    if (!isLogin) {
      dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
      history.push(Path.login());
      return;
    }
    dispatch(
      requestActions.request({
        user: loginUser,
        space,
        body: {
          usage,
          breadth,
          packageContents,
          notes,
          startDate,
          endDate,
        },
      }),
    );
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
            notes={notes}
            onChangeNotes={e => handleChangeUI('notes', e.target.value, setNotes, setErrors)}
          />
          <SendMessageButton
            loading={loading}
            onClick={isSelfSpace ? null : onClickSendMessage}
            onKeyDown={isSelfSpace ? null : onKeyDownButtonMessage}
            disabled={
              !validate(startDate, endDate, usage, space.sizeType, breadth, packageContents, notes)
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
          disabled={confirm || isSelfSpace}
          onClick={onClickButton}
        >
          {isLogin ? 'リクエストを作成する' : '会員登録してリクエスト'}
        </Button>
      )}
    </Wrap>
  );
};

export default RequestApplication;
