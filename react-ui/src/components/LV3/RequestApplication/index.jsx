import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
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
`;

const Title = styled.div`
  margin: 95px auto ${Dimens.medium_20}px;
  padding: 0 ${Dimens.medium}px;
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
  ${media.tablet`
    padding: 0 ${Dimens.medium}px;
  `};
`;

const Row = styled.div`
  &:not(:first-child) {
    margin: ${Dimens.medium2}px 0;
  }
`;

const DataSelectTitle = styled.div`
  font-size: ${FontSizes.small_15}px;
  line-height: normal;
  font-weight: bold;
`;

const DateSelectWrap = styled.div`
  display: flex;
`;

const LinkWrap = styled.div`
  width: 100%;
  margin: ${Dimens.medium2}px auto 0;
  text-align: center;
  ${props =>
    props.isModalRequest &&
    `
    margin: -${Dimens.small_10}px auto ${Dimens.medium2}px;
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
      priceFull,
      priceTatami,
      disabled,
      loading,
      onClick,
      onKeyDownButtonMessage,
      sizeType,
      usage,
      onChangePurpose,
      breadth,
      onChangeBreadth,
      startDate,
      endDate,
      packageContents,
      onChangePackageContents,
      notes,
      onChangeNotes,
      handleModalClose,
      handleModalCloseSP,
    } = this.props;

    return (
      <ContentWrap>
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
        <Title isTopBar={isPC && isModalOpen}>リクエスト内容</Title>
        <FormWrap>
          <Row>
            <Select
              label="用途"
              options={selectOptionUsages('選択してください')}
              onChange={e => onChangePurpose(e.target.value)}
              value={usage}
            />
            <ErrorList keyName="purpose_errors" errors={errors.purpose} />
          </Row>
          <Row date>
            <DataSelectTitle>利用開始日</DataSelectTitle>
            <DateSelectWrap>
              <Select
                options={getYear(5)}
                value={startDate.year}
                onChange={e => onChangeBreadth(e.target.value)}
                width="100%"
                isInline
              />
              <Select
                options={getDate(12, '月')}
                value={startDate.month}
                onChange={e => onChangeBreadth(e.target.value)}
                width="100%"
                isInline
              />
              <Select
                options={getDate(31, '日')}
                value={startDate.day}
                onChange={e => onChangeBreadth(e.target.value)}
                width="100%"
                isInline
              />
            </DateSelectWrap>
            <ErrorList keyName="breadths_errors" errors={errors.breadths} />
          </Row>
          <Row date>
            <DataSelectTitle>利用終了日</DataSelectTitle>
            <DateSelectWrap>
              <Select
                options={getYear(5)}
                value={endDate.year}
                onChange={e => onChangeBreadth(e.target.value)}
                width="100%"
                isInline
              />
              <Select
                options={getDate(12, '月')}
                value={endDate.month}
                onChange={e => onChangeBreadth(e.target.value)}
                width="100%"
                isInline
              />
              <Select
                options={getDate(31, '日')}
                value={endDate.day}
                onChange={e => onChangeBreadth(e.target.value)}
                width="100%"
                isInline
              />
            </DateSelectWrap>
            <ErrorList keyName="breadths_errors" errors={errors.breadths} />
          </Row>
          <Row>
            <Select
              label="希望の広さ"
              options={selectOptionBreadths(
                sizeType === 1 || sizeType === 2 || sizeType === 3 ? 'room' : 'other',
                '選択してください',
              )}
              value={breadth}
              onChange={e => onChangeBreadth(e.target.value)}
            />
            <ErrorList keyName="breadths_errors" errors={errors.breadths} />
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
            <ErrorList keyName="package_contents_errors" errors={errors.packageContents} />
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
            <ErrorList keyName="notes_errors" errors={errors.notes} />
          </Row>
        </FormWrap>
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
      </ContentWrap>
    );
  }

  render() {
    const {
      isPC,
      isModalOpen,
      handleModalOpen,
      // handleModalClose,
      isModalOpenSP,
      handleModalOpenSP,
      handleModalCloseSP,
    } = this.props;
    return (
      <Wrap>
        {(!isPC || !(isPC && isModalOpen)) && (
          <Button
            primary
            borderbold
            fontbold
            fill={1}
            onClick={isPC ? handleModalOpen : handleModalOpenSP}
          >
            リクエストを作成する
          </Button>
        )}
        {isPC && isModalOpen ? (
          <Fragment>{this.getContent()}</Fragment>
        ) : (
          <Modal
            size="large"
            open={isModalOpenSP}
            // open={true}
            onClose={handleModalCloseSP}
            className="semantic-ui-modal-custom"
          >
            <Modal.Content scrolling>{this.getContent()}</Modal.Content>
          </Modal>
        )}
      </Wrap>
    );
  }
}
