import React, { Fragment } from 'react';
import 'moment/locale/ja';
import moment from 'moment';
import styled from 'styled-components';
import Path from 'config/path';
import { Dimens, Colors, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import ImageHero from 'components/LV1/Images/ImageHero';
import InlineText from 'components/LV1/Texts/InlineText';
import dummySpaceImage from 'images/img-dummy-space.png';

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

const ContentWrap = styled.div`
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

const PeriodWrap = styled.div`
  margin-top: ${Dimens.medium2_32}px;
`;

const PeriodItemWrap = styled.div`
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

const getDate = (title, date, isUndecided) => {
  return (
    <PeriodItemWrap>
      <Title>{title}</Title>
      <DateItem>
        {isUndecided === 1 ? '未定' : moment(new Date(date)).format('YYYY年MM月DD日（dd）')}
      </DateItem>
    </PeriodItemWrap>
  );
};

export default ({ space, beginAt, endAt, isUndecided }) => (
  <Fragment>
    <TitleSub>ご利用になるスペース情報</TitleSub>
    <Row to={Path.space(space.id)} borderBottom>
      <ImageWrap>
        <ImageHero
          small
          src={space.images && space.images.length > 0 ? space.images[0].imageUrl : dummySpaceImage}
        />
      </ImageWrap>
      <ContentWrap>
        <AddressText>
          {space.addressPref}
          {space.addressCity}
          {space.addressTown}
        </AddressText>
        <LinkDetail>詳しく見る</LinkDetail>
      </ContentWrap>
      <PeriodWrap>
        {getDate('利用開始日', beginAt, 0)}
        {getDate('利用終了日', endAt, isUndecided)}
      </PeriodWrap>
    </Row>
  </Fragment>
);
