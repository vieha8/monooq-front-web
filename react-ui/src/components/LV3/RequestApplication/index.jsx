import React, { Component } from 'react';
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
  display: block;
  ${media.tablet`
    display: none;
  `};
`;

const Title = styled.h2`
  margin: ${Dimens.medium2}px auto;
  text-align: center;
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
`;

const FormWrap = styled.div`
  margin: auto;
  max-width: 1000px;
  padding: 0 ${Dimens.medium}px;
  ${props =>
    props.isCityTownAreaList &&
    `
      padding: 0 ${Dimens.medium}px 25px;
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
  text-align: center;
`;

const StyledTextButton = styled(TextButton)`
  font-size: ${FontSizes.small};
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
  render() {
    const {
      isModalOpen,
      handleModalOpen,
      handleModalClose,
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
    } = this.props;

    return (
      <Wrap>
        <Button
          primary
          height={42}
          heightTab={42}
          padding="10px 10px"
          paddingTab="10px 10px"
          borderbold
          fontbold
          fill={1}
          onClick={handleModalOpen}
        >
          リクエスト申請
        </Button>
        <Modal
          size="large"
          open={isModalOpen}
          onClose={handleModalClose}
          className="ButtonModalSearchConditionMore pc"
        >
          <Modal.Content scrolling>
            <SendMessage
              isRoom={isRoom}
              priceFull={priceFull}
              priceTatami={priceTatami}
              disabled={disabled}
              loading={loading}
              onClick={onClick}
              onKeyDownButtonMessage={onKeyDownButtonMessage}
            />
            <Title>リクエスト内容</Title>
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
            <LinkWrap>
              <StyledTextButton onClick={handleModalClose}>キャンセルする</StyledTextButton>
            </LinkWrap>
          </Modal.Content>
        </Modal>
      </Wrap>
    );
  }
}
