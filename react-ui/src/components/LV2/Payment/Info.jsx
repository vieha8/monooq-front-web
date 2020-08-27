import React, { Fragment } from 'react';
import 'moment/locale/ja';
import moment from 'moment';
import styled from 'styled-components';
import Path from 'config/path';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { formatAddComma } from 'helpers/string';
import ImageHero from 'components/LV1/Images/ImageHero';
import InlineText from 'components/LV1/Texts/InlineText';
import { Link } from 'react-router-dom';

const dummySpaceImage =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-dummy-space.png?alt=dummy&auto=format&auto=compress';

moment.locale('ja');

const TitleSub = styled.div`
  margin: ${Dimens.small}px auto ${Dimens.xsmall}px;
  font-weight: bold;
  line-height: normal;
  ${media.phone`
    font-size: ${FontSizes.small}px;
  `};
`;

const Row = styled.div`
  padding: ${Dimens.medium}px;
  border: 1px solid ${Colors.borderGray};
`;

const ImageWrap = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 100px;
`;

const SpaceWrap = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding-left: 16px;
`;

const AddressText = styled(InlineText.Base)`
  display: block;
`;

const LinkDetail = styled(InlineText.Small)`
  display: block;
  color: ${Colors.linkBlue};
  ${media.phone`
    font-size: ${FontSizes.small_12}px;
  `};
`;

const PaymentInfoWrap = styled.div`
  margin-top: ${Dimens.medium2_32}px;
`;

const PaymentInfoItem = styled.div`
  margin-top: ${Dimens.medium}px;
  ${media.phone`
    font-size: ${FontSizes.small2_14}px;
  `};
`;

const Title = styled.div`
  font-weight: bold;
  ${media.phone`
    font-size: ${FontSizes.small2_14}px;
  `};
`;

const DateItem = styled.div`
  margin-top: ${Dimens.small_10}px;
  ${media.phone`
    font-size: ${FontSizes.small2_15}px;
  `};
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${Dimens.xsmall}px;
  ${props =>
    props.isEstimateTotal &&
    `
    justify-content: flex-end;
    margin-top: ${Dimens.medium}px;
  `};
`;

export default ({ space, beginAt, price, pricePlusFee, isTakelateBefore }) => (
  <Fragment>
    <TitleSub>ご利用するスペース</TitleSub>
    <Row to={Path.space(space.id)} borderBottom>
      <ImageWrap>
        <ImageHero
          small
          src={space.images && space.images.length > 0 ? space.images[0].imageUrl : dummySpaceImage}
        />
      </ImageWrap>
      <SpaceWrap>
        <AddressText>
          {space.addressPref}
          {space.addressCity}
          {space.addressTown}
        </AddressText>
        <Link target="_blank" to={Path.space(space.id)}>
          <LinkDetail>詳しく見る</LinkDetail>
        </Link>
      </SpaceWrap>
      <PaymentInfoWrap>
        <PaymentInfoItem>
          <Title>利用開始日</Title>
          <DateItem>{moment(new Date(beginAt)).format('YYYY年MM月DD日（dd）')}</DateItem>
        </PaymentInfoItem>
        <PaymentInfoItem>
          <Title>利用開始日</Title>
          <ItemRow>
            <InlineText.Base fontSize={14} color={Colors.lightGray10}>
              スペース基本料金
            </InlineText.Base>
            <InlineText.Base fontSize={14}>{`${formatAddComma(price)}円`}</InlineText.Base>
          </ItemRow>
          <ItemRow>
            <InlineText.Base fontSize={14} color={Colors.lightGray10}>
              ゲストの手数料
            </InlineText.Base>
            <InlineText.Base fontSize={14} color={Colors.lightGray10}>
              {isTakelateBefore ? '0%' : '+10%'}
            </InlineText.Base>
          </ItemRow>
          <ItemRow isEstimateTotal>
            <InlineText.Base fontSize={14} lineheight="12px" color={Colors.lightGray10}>
              ゲスト支払料金
            </InlineText.Base>
            <InlineText.Base fontSize={18} lineheight="12px" bold>
              &nbsp;&nbsp;
              {`${formatAddComma(pricePlusFee)}円`}
            </InlineText.Base>
          </ItemRow>
        </PaymentInfoItem>
      </PaymentInfoWrap>
    </Row>
  </Fragment>
);
