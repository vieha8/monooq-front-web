// @flow

import React from 'react';
import styled from 'styled-components';
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
  cursor: pointer;
  margin: auto;
`;

const Content = styled.div`
  text-align: left;
`;

const Row = styled.div`
  margin-top: ${props => props.marginTop || Dimens.xsmall}px;
  ${props =>
    props.inline &&
    `
    display: flex;
  `};
  ${props =>
    props.right &&
    `
    text-align: right;
  `};
`;

const ImageStar = styled.img`
  max-width: 20px;
  margin-right: 2px;
  vertical-align: text-top;
`;

type PropTypes = {
  isTag?: boolean,
  id: number,
  image: string,
  title: string,
  isRecommended?: boolean,
  address?: string,
  addressPref?: string,
  addressCity?: string,
  priceFull: number,
  priceQuarter: number,
  tagList?: Array<String>,
};

export default ({
  isTag,
  id,
  title,
  isRecommended,
  image,
  address,
  addressPref,
  addressCity,
  priceQuarter,
  priceFull,
  tagList,
}: PropTypes) => (
  <Container>
    <Link to={Path.space(id)}>
      <Card noPadding noBorder>
        <LazyLoad height={123}>
          <ImageHero
            isTag={isTag}
            src={image}
            alt={title}
            height={184}
            heightTab={195}
            heightSp={225}
            heightSpTag={110}
          />
        </LazyLoad>
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
              {address || addressPref + addressCity}
            </InlineText.Base>
          </Row>
          <Row marginTop={4}>
            <InlineText.Base fontSize={16} bold lineheight="140%" lineClamp={2}>
              {title}
            </InlineText.Base>
          </Row>
          <Row right>
            <InlineText.Base
              noWrap
              fontSize={16}
              lineheight="1rem"
              bold
              color={Colors.brandPrimary}
            >
              ¥
              {priceQuarter
                ? numeral(priceQuarter).format('0,0')
                : numeral(priceFull).format('0,0')}
              〜&nbsp;/&nbsp;月
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
