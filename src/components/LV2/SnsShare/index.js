import React, { Fragment } from 'react';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';
import Link from 'next/link';
import ReactGA from 'react-ga';
import { Colors, Dimens, FontSizes } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';

const ImageSnsTwitter =
  'https://monooq.imgix.net/img%2Fservice%2Ficon-sns-twitter-circle.svg?auto=compress';
const ImageSnsFacebook =
  'https://monooq.imgix.net/img%2Fservice%2Ficon-sns-facebook-circle.svg?auto=compress';

const SnsWrap = styled.div`
  text-align: center;
  ${props =>
    props.isOnlyTabSp &&
    `
    display: none;
  `};

  margin: ${Dimens.medium2_32}px auto ${Dimens.medium}px;
  ${media.tablet`
    text-align: left;
    ${props =>
      props.isOnlyTabSp &&
      `
      display: inline-block;
      margin: ${Dimens.large_60}px auto 0 0;
    `};
    display: flex;
    max-width: 230px;
  `};
  ${media.phone`
    margin: ${Dimens.large_60}px auto 0;
  `};
`;

const SnsTitle = styled.div`
  font-size: ${FontSizes.small}px;
  color: ${Colors.black};
  margin-bottom: ${Dimens.medium}px;
  ${media.tablet`
    line-height: ${Dimens.medium3}px;
    margin-bottom: 0;
  `};
`;

const SnsUl = styled.ul`
  display: flex;
  width: 100px;
  margin: auto;
`;

const SnsLi = styled.li`
  margin: auto;
  max-width: ${Dimens.medium3_40}px;
`;

const LinkStyled = styled.a`
  display: block;
  &:active {
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      opacity: 0.8;
    }
  `};
`;

const ImageLogo = styled.img`
  width: 100%;
`;

const getEventGA = (actionText, value) => {
  ReactGA.event({
    category: 'Share',
    action: actionText,
    value,
  });
};

const getIcon = list => {
  return (
    <Fragment>
      {list.map((item, i) => (
        <SnsLi key={i.toString()}>
          <Link href={item.url} passHref>
            <LinkStyled
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => getEventGA(item.actionText, item.value)}
            >
              <LazyLoad>
                <ImageLogo src={item.imageSrc} alt={item.imageAlt} />
              </LazyLoad>
            </LinkStyled>
          </Link>
        </SnsLi>
      ))}
    </Fragment>
  );
};

export default ({ id, name, isOnlyTabSp }) => (
  <SnsWrap isOnlyTabSp={isOnlyTabSp}>
    <SnsTitle>SNSでシェア</SnsTitle>
    <SnsUl>
      {getIcon([
        {
          url: `https://twitter.com/intent/tweet?url=https://monooq.com/space/${id}&text=${name}｜モノオク&hashtags=モノオク`,
          actionText: 'Push Twitter Share Button At Space',
          value: id,
          imageSrc: ImageSnsTwitter,
          imageAlt: 'icon-twitter',
        },
        {
          url: `https://www.facebook.com/sharer/sharer.php?u=https://monooq.com/space/${id}&quote=${name}｜モノオク`,
          actionText: 'Push Facebook Share Button At Space',
          value: id,
          imageSrc: ImageSnsFacebook,
          imageAlt: 'icon-facebook',
        },
      ])}
    </SnsUl>
  </SnsWrap>
);
