// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import numeral from 'numeral';
import Card from 'components/LV1/Card';
import ImageHero from 'components/LV1/Images/ImageHero';
import InlineText from 'components/LV1/Texts/InlineText';
import Tag from 'components/LV1/Texts/Tag';
import { Dimens, Colors } from 'variables';
import { Link } from 'react-router-dom';
import Path from 'config/path';
import LazyLoad from 'react-lazyload';
import iconStar from 'images/img-space-star.svg';

const Container = styled.div`
  max-width: 262px;
  ${media.tablet`
    max-width: 100%;
  `};
  cursor: pointer;
  margin: auto;
`;

const Content = styled.div`
  text-align: left;
`;

const Row = styled.div`
  margin-top: ${props => props.marginTop || Dimens.xsmall}px;
`;

const ImageStar = styled.img`
  max-width: 20px;
  margin-right: 2px;
  vertical-align: text-top;
`;

type PropTypes = {
  id: number,
  image: string,
  title: string,
  isRecommended?: boolean,
  address: string,
  priceFull: number,
  priceQuarter: number,
  tagList?: Array<String>,
};

export default ({
  id,
  title,
  isRecommended,
  image,
  address,
  priceQuarter,
  priceFull,
  tagList,
}: PropTypes) => (
  <Container>
    <Link to={Path.space(id)}>
      <Card noPadding noBorder>
        <LazyLoad height={123}>
          <ImageHero src={image} alt={title} height={184} heightTab={195} heightSp={225} />
        </LazyLoad>
        <Content>
          {isRecommended && (
            <Row>
              <InlineText.Base singleLine fontSize={14} bold color={Colors.brandAccent}>
                <ImageStar src={iconStar} />
                公式おすすめ
              </InlineText.Base>
            </Row>
          )}
          <Row marginTop={10}>
            <InlineText.Base singleLine fontSize={14} color={Colors.lightGray3}>
              {address}
            </InlineText.Base>
          </Row>
          <Row marginTop={4}>
            <InlineText.Base fontSize={16} bold lineheight="140%">
              {title && title.length > 50 ? `${title.slice(0, 50)}…` : title}
            </InlineText.Base>
          </Row>
          <Row>
            <InlineText.Base noWrap fontSize={16} lineheight="1rem" bold>
              {priceQuarter
                ? numeral(priceQuarter).format('0,0')
                : numeral(priceFull).format('0,0')}
              円〜
            </InlineText.Base>
          </Row>
          {tagList && (
            <Row>
              <Tag tagList={tagList} />
            </Row>
          )}
        </Content>
      </Card>
    </Link>
  </Container>
);
