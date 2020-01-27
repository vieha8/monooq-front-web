import React from 'react';
import numeral from 'numeral';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import RequestApplication from 'components/LV3/RequestApplication';
import { Dimens, FontSizes, Colors } from 'variables';

const Wrap = styled.div`
  display: flex;
  max-width: 320px;
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
  disabled,
  loading,
  onClick,
  onKeyDownButtonMessage,
}) => (
  <Wrap isModalRequest={isModalRequest}>
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
        isModalOpenSP={isModalOpenSP}
        handleModalOpenSP={handleModalOpenSP}
        handleModalCloseSP={handleModalCloseSP}
        errors={{}}
        isRoom
        priceFull="10,000"
        priceTatami="5,000"
        disabled={false}
        loading={false}
        onClick={() => console.log('onClick')}
        onKeyDownButtonMessage={() => console.log('onKeyDownButtonMessage')}
        sizeType={1} // TODO: isRoomと統合
        usage={1}
        onChangePurpose={() => console.log('onChangePurpose')}
        breadth={1}
        onChangeBreadth={() => console.log('onChangeBreadth')}
        packageContents="冷蔵庫、洗濯機"
        onChangePackageContents={() => console.log('onChangePackageContents')}
        notes="1ヶ月延長するかもしれません"
        onChangeNotes={() => console.log('onChangeNotes')}
        startDate={[
          {
            year: 2020,
            month: 10,
            day: 20,
          },
        ]}
        endDate={[
          {
            year: 2020,
            month: 12,
            day: 31,
          },
        ]}
      />
    </ButtonWrap>
  </Wrap>
);
