import React, { useState, useEffect, useRef, Fragment } from 'react';
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
import Link from 'next/link';
import Path from 'config/path';
import LazyLoad from 'react-lazyload';
import { media, mediaMin } from 'helpers/style/media-query';
import Availability from 'components/LV1/Texts/Availability';

const IconStar = 'https://monooq.imgix.net/img%2Fservice%2Fimg-space-star.svg?auto=compress';

const dummySpaceImage =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-dummy-space.png?alt=dummy&auto=format&auto=compress';

const Wrap = styled.div`
  cursor: pointer;
  margin: auto;
`;

const CardStyled = styled(Card)`
  ${media.tablet`
    display: flex;
  `}
`;

const Content = styled.div`
  text-align: left;
  ${media.tablet`
    width: 60%;
    margin-left:  ${Dimens.small_10}px;
  `}
`;

const CardInner = styled.div`
  position: relative;
  ${media.tablet`
    width: 40%;
  `}
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
  `};
  ${props =>
    props.isNoViewLastLogin &&
    `
    display: block;
  `};
  ${media.tablet`
    ${props =>
      props.top &&
      `
      margin-top: 0px;
    `};
  `}
  ${media.phone`
    ${props =>
      props.price &&
      `
      display: block;
    `};
  `}
`;

const TagRow = styled(Row)`
  ${props => (props.hasMoreTags ? 'height: 72px' : '')}
  overflow: hidden;
`;

const ImageStar = styled.img`
  max-width: 20px;
  margin-right: 2px;
  vertical-align: text-top;
`;

const Title = styled(InlineText.Base)`
  word-wrap: break-word;
  ${mediaMin.phone`
    height: 44px;
  `}
`;

const ShowMore = styled.div`
  text-align: center;
`;

const ShowMoreText = styled(InlineText.Tiny)`
  font-weight: bold;
  text-decoration: underline;
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
  via,
}) => {
  const [hasHiddenTags, setHasHiddenTags] = useState(false);
  const [calcTagsHeight, setCalcTagsHeight] = useState(false);
  const [isOpenTags, setIsOpenTags] = useState(false);
  const tagsContainerRef = useRef(null);

  useEffect(() => {
    const { current } = tagsContainerRef;
    if (calcTagsHeight || !current) return;

    setCalcTagsHeight(true);
    setHasHiddenTags(current.clientHeight > 72);
  }, [calcTagsHeight]);

  const onClickSpace = () => {
    ReactGA.plugin.execute('ec', 'addProduct', {
      id,
      name: title,
    });
    ReactGA.plugin.execute('ec', 'setAction', 'click', {});
  };

  // 畳数あたりの価格が登録されていないスペースの場合があるため && 0が登録されている場合が最低価格として表示不適切なため
  const isExistTatamiPrice = !!priceTatami;
  // 1畳未満のスペースは部屋全体価格が畳数単価より低い場合があるため
  const isPriceFullHigherThanpriceTatami = priceFull > priceTatami;

  const getViewPrice = () => (
    <Fragment>
      {isExistTatamiPrice && isPriceFullHigherThanpriceTatami && (
        <Fragment>
          <span style={{ fontSize: '80%', fontWeight: 'normal' }}>1畳あたり:</span>
          {`￥${numeral(priceTatami).format('0,0')}`}
          <span style={{ fontSize: '80%', fontWeight: 'normal' }}>&nbsp;/&nbsp;月</span>
          <br />
        </Fragment>
      )}
      <span style={{ fontSize: '80%', fontWeight: 'normal' }}>全て利用:</span>
      {`￥${numeral(priceFull).format('0,0')}`}
      <span style={{ fontSize: '80%', fontWeight: 'normal' }}>&nbsp;/&nbsp;月</span>
    </Fragment>
  );

  return (
    <Wrap>
      <Link href={`${Path.space(id)}${via ? `?via=${via}` : ''}`} onClick={onClickSpace}>
        <a>
          <CardStyled noPadding noBorder>
            <CardInner>
              <LazyLoad height={123}>
                <ImageHero
                  isTag={isTag}
                  src={image || dummySpaceImage}
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
              <Row marginTop={10} top>
                <InlineText.Base singleLine fontSize={14} color={Colors.lightGray3}>
                  {isRecommended && (
                    <InlineText.Base
                      fontSize={14}
                      bold
                      color={Colors.brandAccent}
                      margin={isTag ? '0 4px 0 0' : '0 8px 0 0'}
                    >
                      <ImageStar src={IconStar} />
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
                <InlineText.Base noWrap fontSize={16} fontSizeSp={14} fontSizeSpSmall={12} bold>
                  {getViewPrice()}
                </InlineText.Base>
              </Row>
              <Row marginTop={8}>
                {!isNoViewLastLogin && (
                  <StatusText setData={getDateRelativeLastLogin(lastLoginAt || user.lastLoginAt)} />
                )}
              </Row>
            </Content>
          </CardStyled>
        </a>
      </Link>
      {tags && tags.length > 0 && (
        <Fragment>
          <TagRow hasMoreTags={hasHiddenTags && !isOpenTags} marginTop={12} ref={tagsContainerRef}>
            <Tag tagList={tags.map(v => v.name)} />
          </TagRow>
          {hasHiddenTags && !isOpenTags && (
            <ShowMore onClick={() => setIsOpenTags(true)}>
              <ShowMoreText singleLine fontSize={14} color={Colors.lightGray3}>
                もっと見る
              </ShowMoreText>
            </ShowMore>
          )}
        </Fragment>
      )}
    </Wrap>
  );
};

export default SpaceResultItem;
