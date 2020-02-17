import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
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
import { handleChangeUI, handleChangeDate, validate } from './Shere';

moment.locale('ja');

const Wrap = styled.div`
  text-align: left;
  color: ${Colors.black};
`;

const ContentWrap = styled.div`
  max-width: 768px;
  margin: auto;
  position: relative;
  top: 95px;
  padding: 0 ${Dimens.medium}px 120px;
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
  border-top: 1px solid ${Colors.borderGray};
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
  border-bottom: 1px solid ${Colors.borderGray};
`;

const SendMessageWrapInnter = styled.div`
  display: flex;
  max-width: 320px;
  margin: auto;
`;

const getRequestSet = (isModal, space, loading, onClick, onKeyDown, disabled, text) => {
  return (
    <SendMessageWrapOuter isModal={isModal}>
      <SendMessageWrap>
        <SendMessageWrapInnter>
          <SendMessageCaption
            isRoom={space.sizeType > 0 && space.sizeType < 4}
            priceTatami={space.priceFull}
            priceFull={space.priceFull}
          />
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
  confirm,
  params,
  isModalOpenSP,
  handleModalOpenSP,
  handleModalCloseSP,
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
    handleModalOpenSP();
  };

  const onClickSendMessage = async () => {
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
      {getRequestSet(
        false,
        space,
        loading,
        onClickButton,
        null,
        confirm || isSelfSpace,
        isLogin ? 'リクエストを作成する' : '会員登録してリクエスト',
      )}
      <Modal
        size="large"
        open={isModalOpenSP}
        onClose={handleModalCloseSP}
        className="semantic-ui-modal-custom request"
      >
        <Fragment>
          <Modal.Content scrolling>
            {getRequestSet(
              true,
              space,
              loading,
              isSelfSpace ? null : onClickSendMessage,
              isSelfSpace ? null : onKeyDownButtonMessage,
              !validate(startDate, endDate, usage, space.sizeType, breadth, packageContents, notes),
              '',
            )}
            <ContentWrap>
              <Form
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
                onChangeBreadth={e =>
                  handleChangeUI('breadth', e.target.value, setBreadth, setErrors)
                }
                packageContents={packageContents}
                onChangePackageContents={e =>
                  handleChangeUI('packageContents', e.target.value, setPackageContents, setErrors)
                }
                notes={notes}
                onChangeNotes={e => handleChangeUI('notes', e.target.value, setNotes, setErrors)}
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
