import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import ReactGA from 'react-ga';
import { getDateRelativeLastLogin } from 'helpers/date';
import Card from 'components/LV1/Card';
import ImageHero from 'components/LV1/Images/ImageHero';
import InlineText from 'components/LV1/Texts/InlineText';
import Tag from 'components/LV1/Texts/Tag';
import StatusText from 'components/LV1/Texts/StatusText';
import { Dimens, Colors } from 'variables';
import { Link } from 'react-router-dom';
import Path from 'config/path';
import LazyLoad from 'react-lazyload';
import iconStar from 'images/img-space-star.svg';
import { media, mediaMin } from 'helpers/style/media-query';
import Availability from 'components/LV1/Texts/Availability';

const Wrap = styled.div`
  cursor: pointer;
  margin: auto;
`;

const Content = styled.div`
  text-align: left;
`;

const CardInner = styled.div`
  position: relative;
`;

const AvailabilityLayout = styled.div`
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
`;

const Row = styled.div`
  margin-top: ${props => props.marginTop || Dimens.xsmall}px;
  ${props =>
    props.inline &&
    `
    display: flex;
  `};
  ${props =>
    props.price &&
    `
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: right;
  `};
  ${props =>
    props.isNoViewLastLogin &&
    `
    display: block;
  `};
  ${media.phone`
    ${props =>
      props.price &&
      `
      display: block;
    `};
  `}
`;

const ImageStar = styled.img`
  max-width: 20px;
  margin-right: 2px;
  vertical-align: text-top;
`;

const Title = styled(InlineText.Base)`
  ${mediaMin.phone`
    height: 44px;
  `}
`;

const SpaceResultItem = ({
  isTag,
  id,
  title,
  isRecommended,
  image,
  address,
  addressPref,
  addressCity,
  addressTown,
  priceFull,
  priceTatami,
  tags,
  lastLoginAt,
  user,
  isNoViewLastLogin,
  status,
}) => {
  const onClickSpace = () => {
    ReactGA.plugin.execute('ec', 'addProduct', {
      id,
      name: title,
    });
    ReactGA.plugin.execute('ec', 'setAction', 'click', {});
  };

  // 畳数あたりの価格が登録されていないスペースの場合があるため && 0が登録されている場合が最低価格として表示不適切なため
  const isExistTatamiPrice = !!priceTatami && priceTatami > 0;
  // 0.5畳などの時、部屋全体の価格の方が高いことがあるので、その判定
  const isFullPriceHigherThanTatami = isExistTatamiPrice && priceFull > priceTatami;

  return (
    <Wrap>
      <Link to={Path.space(id)} onClick={onClickSpace}>
        <Card noPadding noBorder>
          <CardInner>
            <LazyLoad height={123}>
              <ImageHero
                isTag={isTag}
                src={image}
                alt={title}
                height={184}
                heightTab={195}
                heightSp={120}
                heightSpTag={110}
              />
              {status && (
                <AvailabilityLayout>
                  <Availability status={status} />
                </AvailabilityLayout>
              )}
            </LazyLoad>
          </CardInner>
          <Content>
            <Row marginTop={10}>
              <InlineText.Base singleLine fontSize={14} color={Colors.lightGray3}>
                {isRecommended && (
                  <InlineText.Base
                    fontSize={14}
                    bold
                    color={Colors.brandAccent}
                    margin={isTag ? '0 4px 0 0' : '0 8px 0 0'}
                  >
                    <ImageStar src={iconStar} />
                    {!isTag && '公式おすすめ'}
                  </InlineText.Base>
                )}
                {address || addressPref + addressCity + addressTown}
              </InlineText.Base>
            </Row>
            <Row marginTop={4}>
              <Title fontSize={16} fontSizeSp={14} bold lineheight="140%" lineClamp={2}>
                {title}
              </Title>
            </Row>
            <Row price isNoViewLastLogin={isNoViewLastLogin}>
              <InlineText.Base noWrap fontSize={16} bold>
                {isFullPriceHigherThanTatami ? (
                  <>
                    {isExistTatamiPrice && `￥${numeral(priceTatami).format('0,0')}`}~
                    {`￥${numeral(priceFull).format('0,0')}`}
                  </>
                ) : (
                  <>
                    {isExistTatamiPrice && `￥${numeral(priceFull).format('0,0')}`}~
                    {`￥${numeral(priceTatami).format('0,0')}`}
                  </>
                )}
                <span style={{ fontSize: '80%', fontWeight: 'normal' }}>&nbsp;/&nbsp;月</span>
              </InlineText.Base>
            </Row>
            <Row marginTop={8}>
              {!isNoViewLastLogin && (
                <StatusText setData={getDateRelativeLastLogin(lastLoginAt || user.lastLoginAt)} />
              )}
            </Row>
          </Content>
        </Card>
      </Link>
      {tags && tags.length > 0 && (
        <Row marginTop={12}>
          <Tag tagList={tags.map(v => v.name)} />
        </Row>
      )}
    </Wrap>
  );
};

export default SpaceResultItem;
