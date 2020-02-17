import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import Path from 'config/path';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors, ErrorMessages, ZIndexes } from 'variables';
import { getToday, generateDateAll } from 'helpers/date';
import { getBreadthsDetailRoom, getBreadthsDetailOther } from 'helpers/breadths';
import { iskeyDownEnter } from 'helpers/keydown';
import { media } from 'helpers/style/media-query';
import { requestActions } from 'redux/modules/request';
import { uiActions } from 'redux/modules/ui';
import Button from 'components/LV1/Forms/Button';
import TextButton from 'components/LV1/Texts/TextButton';
import SendMessageCaption from 'components/LV2/Space/SendMessageCaption';
import Form from './Form';

moment.locale('ja');

const Validate = {
  PackageContents: {
    Max: 1000,
  },
  Notes: {
    Max: 1000,
  },
};

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

const Title = styled.div`
  margin: ${Dimens.medium_20} auto ${Dimens.medium_20}px;
  text-align: center;
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
`;

const ButtonRequestWrap = styled.div`
  margin: ${Dimens.medium_20}px auto 0;
  pointer-events: auto !important;
`;

const LinkWrap = styled.div`
  width: 100%;
  margin: ${Dimens.medium2}px auto 0;
  text-align: center;
  margin: ${Dimens.medium_20}px auto ${Dimens.medium2}px;
`;

const StyledTextButton = styled(TextButton)`
  font-size: ${FontSizes.small}px;
  font-weight: bold;
  color: ${Colors.lightGray10};
  text-decoration: none;
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

const SendMessageButtonWrap = styled.div`
  display: inline-block;
  min-width: 185px;
`;

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

  const handleChangeDate = (type, propName, value) => {
    const setError = [];

    let startDateYear = startDate.year;
    let startDateMonth = startDate.month;
    let startDateDay = startDate.day;
    let endDateYear = endDate.year;
    let endDateMonth = endDate.month;
    let endDateDay = endDate.day;

    if (type === 'startDate') {
      switch (propName) {
        case 'year':
          setStartDate(state => ({ ...state, year: value }));
          startDateYear = value;
          break;
        case 'month':
          setStartDate(state => ({ ...state, month: value }));
          startDateMonth = value;
          break;
        case 'day':
          setStartDate(state => ({ ...state, day: value }));
          startDateDay = value;
          break;
        default:
          break;
      }
    } else {
      switch (propName) {
        case 'year':
          setEndDate(state => ({ ...state, year: value }));
          endDateYear = value;
          break;
        case 'month':
          setEndDate(state => ({ ...state, month: value }));
          endDateMonth = value;
          break;
        case 'day':
          setEndDate(state => ({ ...state, day: value }));
          endDateDay = value;
          break;
        default:
          break;
      }
    }

    const startDateAll = generateDateAll(startDateYear, startDateMonth, startDateDay);
    const endDateAll = generateDateAll(endDateYear, endDateMonth, endDateDay);
    if (moment(startDateAll).isValid() && moment(endDateAll).isValid()) {
      if (moment(startDateAll).isBefore(moment(getToday()))) {
        setError.push(ErrorMessages.InvalidStartDate);
      }
      if (moment(startDateAll).isSameOrAfter(moment(endDateAll))) {
        setError.push(ErrorMessages.InvalidDateReverse);
      }
    } else {
      setError.push(ErrorMessages.InvalidDate);
    }

    setErrors(state => ({ ...state, desiredPeriod: setError }));
  };

  const handleChangeUI = (propName, value) => {
    const setError = [];

    switch (propName) {
      case 'usage':
        if (value.length === 0) {
          setError.push(ErrorMessages.PleaseSelect);
        }
        setUsage(value);
        setErrors(state => ({ ...state, usage: setError }));
        break;

      case 'breadth':
        if (value.length === 0) {
          setError.push(ErrorMessages.PleaseSelect);
        }
        setBreadth(value);
        setErrors(state => ({ ...state, breadth: setError }));
        break;

      case 'packageContents':
        if (!value || value.trim().length === 0) {
          setError.push(ErrorMessages.PleaseInput);
        } else if (value.length > Validate.PackageContents.Max) {
          setError.push(ErrorMessages.LengthMax('自己紹介', Validate.PackageContents.Max));
        }
        setPackageContents(value);
        setErrors(state => ({ ...state, packageContents: setError }));
        break;

      case 'notes':
        if (value.length > Validate.Notes.Max) {
          setError.push(ErrorMessages.LengthMax('自己紹介', Validate.Notes.Max));
        }
        setNotes(value);
        setErrors(state => ({ ...state, notes: setError }));
        break;

      default:
        break;
    }
  };

  const validate = () => {
    const startDateAll = generateDateAll(startDate.year, startDate.month, startDate.day);
    const endDateAll = generateDateAll(endDate.year, endDate.month, endDate.day);

    let checkBreadth = 0;
    if (space.sizeType > 0 && space.sizeType < 4) {
      checkBreadth = getBreadthsDetailRoom(breadth) ? breadth : 0;
    } else {
      checkBreadth = getBreadthsDetailOther(breadth) ? breadth : 0;
    }

    return (
      usage &&
      breadth &&
      checkBreadth > 0 &&
      packageContents &&
      (packageContents === undefined
        ? false
        : packageContents.trim().length > 0 &&
          packageContents.trim().length <= Validate.PackageContents.Max) &&
      notes.trim().length <= Validate.Notes.Max &&
      moment(startDateAll).isValid() &&
      moment(endDateAll).isValid() &&
      !moment(startDateAll).isBefore(moment(getToday())) &&
      !moment(startDateAll).isSameOrAfter(moment(endDateAll))
    );
  };

  return (
    <Wrap>
      <SendMessageWrapOuter>
        <SendMessageWrap>
          <SendMessageWrapInnter>
            <SendMessageCaption
              isRoom={space.sizeType > 0 && space.sizeType < 4}
              priceTatami={space.priceFull}
              priceFull={space.priceFull}
            />
            <SendMessageButtonWrap>
              <Button
                center
                primary
                fontbold
                fill={1}
                disabled={confirm || isSelfSpace}
                onClick={onClickButton}
              >
                {isLogin ? 'リクエストを作成する' : '会員登録してリクエスト'}
              </Button>
            </SendMessageButtonWrap>
          </SendMessageWrapInnter>
        </SendMessageWrap>
      </SendMessageWrapOuter>
      <Modal
        size="large"
        open={isModalOpenSP}
        onClose={handleModalCloseSP}
        className="semantic-ui-modal-custom request"
      >
        <Fragment>
          <Modal.Content scrolling>
            <SendMessageWrapOuter isModal>
              <SendMessageWrap>
                <SendMessageWrapInnter>
                  <SendMessageCaption
                    isRoom={space.sizeType > 0 && space.sizeType < 4}
                    priceTatami={space.priceFull}
                    priceFull={space.priceFull}
                  />
                  <SendMessageButtonWrap>
                    <Button
                      center
                      primary
                      fontbold
                      fill={1}
                      disabled={!validate()}
                      loading={loading}
                      onClick={isSelfSpace ? null : onClickSendMessage}
                      onKeyDown={isSelfSpace ? null : onKeyDownButtonMessage}
                    >
                      リクエスト申請
                    </Button>
                  </SendMessageButtonWrap>
                </SendMessageWrapInnter>
              </SendMessageWrap>
            </SendMessageWrapOuter>
            <ContentWrap>
              <Title>リクエスト内容</Title>
              <Form
                errors={errors}
                sizeType={space.sizeType}
                usage={usage}
                onChangeUsage={e => handleChangeUI('usage', e.target.value)}
                startDate={startDate}
                onCHangeStartDateYear={e => handleChangeDate('startDate', 'year', e.target.value)}
                onCHangeStartDateMonth={e => handleChangeDate('startDate', 'month', e.target.value)}
                onCHangeStartDateDay={e => handleChangeDate('startDate', 'day', e.target.value)}
                endDate={endDate}
                onCHangeEndDateYear={e => handleChangeDate('endDate', 'year', e.target.value)}
                onCHangeEndDateMonth={e => handleChangeDate('endDate', 'month', e.target.value)}
                onCHangeEndDateDay={e => handleChangeDate('endDate', 'day', e.target.value)}
                breadth={breadth}
                onChangeBreadth={e => handleChangeUI('breadth', e.target.value)}
                packageContents={packageContents}
                onChangePackageContents={e => handleChangeUI('packageContents', e.target.value)}
                notes={notes}
                onChangeNotes={e => handleChangeUI('notes', e.target.value)}
              />
              <ButtonRequestWrap>
                <LinkWrap>
                  <StyledTextButton onClick={handleModalCloseSP}>キャンセルする</StyledTextButton>
                </LinkWrap>
              </ButtonRequestWrap>
            </ContentWrap>
          </Modal.Content>
        </Fragment>
      </Modal>
    </Wrap>
  );
};

export default RequestApplicationSP;
