import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { selectOptionUsages } from 'helpers/usages';
import { selectOptionBreadths } from 'helpers/breadths';
import { Dimens, FontSizes, Colors } from 'variables';
import Button from 'components/LV1/Forms/Button';
import TextButton from 'components/LV1/Texts/TextButton';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';
import SendMessage from 'components/LV2/Space/SendMessage';

const Wrap = styled.div`
  text-align: left;
  color: ${Colors.black};
`;

const ContentWrap = styled.div`
  max-width: 768px;
  margin: auto;
  position: relative;
  ${props =>
    props.isModalRequest &&
    `
    top: 95px;
    padding: 0 ${Dimens.medium}px 120px;
  `};
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

const FormWrap = styled.div`
  margin: auto;
  max-width: 1000px;
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

const ButtonRequestWrap = styled.div`
  margin: ${Dimens.medium_20}px auto 0;
`;

const LinkWrap = styled.div`
  width: 100%;
  margin: ${Dimens.medium2}px auto 0;
  text-align: center;
  ${props =>
    props.isModalRequest &&
    `
    margin: ${Dimens.medium_20}px auto ${Dimens.medium2}px;
  `};
`;

const StyledTextButton = styled(TextButton)`
  font-size: ${FontSizes.small}px;
  font-weight: bold;
  color: ${Colors.lightGray10};
  text-decoration: none;
`;

const getYear = lengthYear => {
  return Array(lengthYear)
    .fill(0)
    .map((_, i) => ({
      key: i,
      value: moment().year() + i,
      text: `${moment().year() + i}年`,
    }));
};

const getDate = (lengthPeriod, typeText) => {
  return Array(lengthPeriod)
    .fill(0)
    .map((_, i) => ({ key: i, value: i + 1, text: i + 1 + typeText }));
};

export default class RequestApplication extends Component {
  getContent() {
    const {
      isPC,
      isModalOpen,
      errors,
      isRoom,
      disabled,
      loading,
      onClick,
      onKeyDownButtonMessage,
      usage,
      onChangeUsage,
      startDate,
      onChangeStartDateYear,
      onChangeStartDateMonth,
      onChangeStartDateDay,
      endDate,
      onChangeEndDateYear,
      onChangeEndDateMonth,
      onChangeEndDateDay,
      breadth,
      onChangeBreadth,
      packageContents,
      onChangePackageContents,
      notes,
      onChangeNotes,
      handleModalClose,
      handleModalCloseSP,
    } = this.props;

    return (
      <ContentWrap isModalRequest={!isPC}>
        <Title isTopBar={isPC && isModalOpen}>リクエスト内容</Title>
        <FormWrap>
          <Row>
            <Select
              label="用途"
              options={selectOptionUsages('選択してください')}
              onChange={e => onChangeUsage(e.target.value)}
              value={usage}
            />
            <ErrorList keyName="usage_errors" errors={errors && errors.usage} />
          </Row>
          <Row date>
            <DataSelectTitle>利用開始日</DataSelectTitle>
            <DateSelectWrap>
              <Select
                options={getYear(5)}
                value={startDate && startDate.year}
                onChange={e => onChangeStartDateYear(e.target.value)}
                width="100%"
                isInline
              />
              <Select
                options={getDate(12, '月')}
                value={startDate && startDate.month}
                onChange={e => onChangeStartDateMonth(e.target.value)}
                width="100%"
                isInline
              />
              <Select
                options={getDate(31, '日')}
                value={startDate && startDate.day}
                onChange={e => onChangeStartDateDay(e.target.value)}
                width="100%"
                isInline
              />
            </DateSelectWrap>
          </Row>
          <Row date>
            <DataSelectTitle>利用終了日</DataSelectTitle>
            <DateSelectWrap>
              <Select
                options={getYear(5)}
                value={startDate && endDate.year}
                onChange={e => onChangeEndDateYear(e.target.value)}
                width="100%"
                isInline
              />
              <Select
                options={getDate(12, '月')}
                value={startDate && endDate.month}
                onChange={e => onChangeEndDateMonth(e.target.value)}
                width="100%"
                isInline
              />
              <Select
                options={getDate(31, '日')}
                value={startDate && endDate.day}
                onChange={e => onChangeEndDateDay(e.target.value)}
                width="100%"
                isInline
              />
            </DateSelectWrap>
            <ErrorList keyName="desiredPeriod_errors" errors={errors && errors.desiredPeriod} />
          </Row>
          <Row>
            <Select
              label="希望の広さ"
              options={selectOptionBreadths(isRoom ? 'room' : 'other', '選択してください')}
              value={breadth}
              onChange={e => onChangeBreadth(e.target.value)}
            />
            <ErrorList keyName="breadth_errors" errors={errors && errors.breadth} />
          </Row>
          <Row>
            <InputForm
              label="荷物内容"
              placeholder="冷蔵庫、洗濯機、段ボール4箱..."
              rows={3}
              multiline
              onChange={e => onChangePackageContents(e.target.value)}
              value={packageContents}
            />
            <ErrorList
              keyName="package_contents_errors"
              errors={errors && errors.packageContents}
            />
          </Row>
          <Row>
            <InputForm
              label="備考"
              labelSub="任意"
              placeholder="ホストへの連絡事項など"
              rows={3}
              multiline
              onChange={e => onChangeNotes(e.target.value)}
              value={notes}
            />
            <ErrorList keyName="notes_errors" errors={errors && errors.notes} />
          </Row>
        </FormWrap>
        <ButtonRequestWrap>
          {isPC && (
            <Button
              center
              primary
              fontbold
              fill={1}
              disabled={disabled}
              loading={loading}
              onClick={onClick}
              onKeyDown={onKeyDownButtonMessage}
            >
              リクエスト申請
            </Button>
          )}
          <LinkWrap isModalRequest={!isPC}>
            <StyledTextButton onClick={isPC ? handleModalClose : handleModalCloseSP}>
              キャンセルする
            </StyledTextButton>
          </LinkWrap>
        </ButtonRequestWrap>
      </ContentWrap>
    );
  }

  render() {
    const {
      isLogin,
      confirm,
      isPC,
      isModalOpen,
      handleModalOpen,
      isModalOpenSP,
      handleModalOpenSP,
      handleModalCloseSP,
      handleSignUp,
      buttonRequestCreatedisabled,
      isRoom,
      priceFull,
      priceTatami,
      disabled,
      loading,
      onClick,
      onKeyDownButtonMessage,
    } = this.props;

    const onClickButton = () => {
      if (!isLogin) {
        handleSignUp();
        return;
      }
      if (isPC) {
        handleModalOpen();
        return;
      }
      handleModalOpenSP();
    };

    return (
      <Wrap>
        {(!isPC || !(isPC && isModalOpen)) && (
          <Button
            fontSize={14}
            primary
            borderbold
            fontbold
            fill={1}
            disabled={confirm || buttonRequestCreatedisabled}
            onClick={onClickButton}
          >
            {isLogin ? 'リクエストを作成する' : '会員登録してリクエスト'}
          </Button>
        )}
        {isPC && isModalOpen ? (
          <Fragment>{this.getContent()}</Fragment>
        ) : (
          <Modal
            size="large"
            open={isModalOpenSP}
            onClose={handleModalCloseSP}
            className="semantic-ui-modal-custom request"
          >
            <Fragment>
              {!isPC && (
                <SendMessage
                  isModalRequest
                  isRoom={isRoom}
                  priceFull={priceFull}
                  priceTatami={priceTatami}
                  disabled={disabled}
                  loading={loading}
                  onClick={onClick}
                  onKeyDownButtonMessage={onKeyDownButtonMessage}
                />
              )}
              <Modal.Content scrolling>{this.getContent()}</Modal.Content>
            </Fragment>
          </Modal>
        )}
      </Wrap>
    );
  }
}
