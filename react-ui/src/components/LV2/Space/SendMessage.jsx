import React from 'react';
import numeral from 'numeral';
import styled from 'styled-components';
import { mediaMin } from 'helpers/style/media-query';
import InlineText from 'components/LV1/Texts/InlineText';
import RequestApplication from 'components/LV3/RequestApplication';
import { Dimens, FontSizes, Colors, ZIndexes } from 'variables';

const WrapOuter = styled.div`
  width: 100%;
  min-width: 320px;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: ${ZIndexes.frontPartsOverFooter};
  text-align: center;
  padding: ${Dimens.small2}px ${Dimens.medium}px;
  background-color: ${Colors.white};
  border-top: 1px solid ${Colors.borderGray};
  ${props =>
    props.noPadding &&
    `
      padding: 0 ${Dimens.medium}px;
    `};
  ${mediaMin.tablet`
    ${props =>
      !props.isModalRequest &&
      `
      display: none;
    `};
  `};
`;

const Wrap = styled.div`
  max-width: 640px;
  min-width: 320px;
  margin: auto;
  ${props =>
    props.isModalRequest &&
    `
      position: fixed;
      max-width: 100%;
      top: 0;
      left: 0;
      right: 0;
      padding: ${Dimens.small2}px ${Dimens.medium}px;
      background-color: ${Colors.white};
      border-bottom: 1px solid ${Colors.borderGray};
    `};
`;

const WrapInnter = styled.div`
  display: flex;
  max-width: 320px;
  margin: auto;
`;

const Caption = styled.div`
  width: 100%;
  display: inline-block;
  margin-left: -${Dimens.medium}px;
  text-align: center;
  line-height: ${Dimens.medium4}px;
  ${props =>
    props.isRoom &&
    `
      line-height: normal;
    `};
`;

const Price = styled.span`
  font-size: ${FontSizes.medium_18}px;
  font-weight: bold;
`;

const Unit = styled.div``;

const ButtonWrap = styled.div`
  display: inline-block;
  min-width: 200px;
`;

export default ({
  isModalRequest,
  isModalOpenSP,
  handleModalOpenSP,
  handleModalCloseSP,
  isRoom,
  priceFull,
  priceTatami,
  buttonRequestDisabled,
  loading,
  onClick,
  onKeyDownButtonMessage,
  usage,
  onChangeUsage,
  startDate,
  startDateSP,
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
  errors,
}) => (
  <WrapOuter
    isModalRequest={isModalRequest}
    noPadding={isModalOpenSP || isModalOpenSP === undefined}
  >
    <Wrap isModalRequest={isModalRequest}>
      <WrapInnter>
        <Caption isRoom={isRoom}>
          <Price>
            {isRoom ? numeral(priceTatami).format('0,0') : `〜${numeral(priceFull).format('0,0')}`}
          </Price>
          <InlineText.Base fontSize={FontSizes.small_12} bold>
            &nbsp;円/月
          </InlineText.Base>
          {isRoom && (
            <Unit>
              <InlineText.EmphasisTiny>1畳あたり</InlineText.EmphasisTiny>
            </Unit>
          )}
        </Caption>
        <ButtonWrap>
          {/* <Button
            center
            primary
            fontbold
            fill={1}
            disabled={disabled}
            loading={loading}
            onClick={onClick}
            onKeyDown={onKeyDownButtonMessage}
          >
            リクエストを作成する
          </Button> */}
          <RequestApplication
            errors={errors}
            isModalOpenSP={isModalOpenSP}
            handleModalOpenSP={handleModalOpenSP}
            handleModalCloseSP={handleModalCloseSP}
            priceFull={priceFull}
            priceTatami={priceTatami}
            disabled={buttonRequestDisabled}
            loading={loading}
            onClick={onClick}
            onKeyDownButtonMessage={onKeyDownButtonMessage}
            isRoom={isRoom}
            usage={usage}
            onChangeUsage={onChangeUsage}
            breadth={breadth}
            onChangeBreadth={onChangeBreadth}
            startDate={startDate}
            startDateSP={startDateSP}
            onChangeStartDateYear={onChangeStartDateYear}
            onChangeStartDateMonth={onChangeStartDateMonth}
            onChangeStartDateDay={onChangeStartDateDay}
            endDate={endDate}
            onChangeEndDateYear={onChangeEndDateYear}
            onChangeEndDateMonth={onChangeEndDateMonth}
            onChangeEndDateDay={onChangeEndDateDay}
            packageContents={packageContents}
            onChangePackageContents={onChangePackageContents}
            notes={notes}
            onChangeNotes={onChangeNotes}
          />
        </ButtonWrap>
      </WrapInnter>
    </Wrap>
  </WrapOuter>
);
