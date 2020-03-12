import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import ReactGA from 'react-ga';
import Card from 'components/LV1/Card';
import ImageHero from 'components/LV1/Images/ImageHero';
import InlineText from 'components/LV1/Texts/InlineText';
import Tag from 'components/LV1/Texts/Tag';
import { Dimens, Colors } from 'variables';
import { Link } from 'react-router-dom';
import Path from 'config/path';
import LazyLoad from 'react-lazyload';
import iconStar from 'images/img-space-star.svg';
import { mediaMin } from 'helpers/style/media-query';

const Wrap = styled.div`
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
  tags,
}) => {
  const onClickSpace = () => {
    ReactGA.plugin.execute('ec', 'addProduct', {
      id,
      name: title,
    });
    ReactGA.plugin.execute('ec', 'setAction', 'click', {});
  };

  return (
    <Wrap>
      <Link to={Path.space(id)} onClick={onClickSpace}>
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
                {address || addressPref + addressCity + addressTown}
              </InlineText.Base>
            </Row>
            <Row marginTop={4}>
              <Title fontSize={16} bold lineheight="140%" lineClamp={2}>
                {title}
              </Title>
            </Row>
            <Row right>
              <InlineText.Base noWrap fontSize={16} bold color={Colors.brandPrimary}>
                {`〜${numeral(priceFull).format('0,0')}`}
                円&nbsp;/&nbsp;月
              </InlineText.Base>
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
