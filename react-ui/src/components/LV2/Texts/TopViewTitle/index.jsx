import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import CatchPhrase from 'components/LV1/Texts/CatchPhrase';
import CatchPhraseSub from 'components/LV1/Texts/CatchPhraseSub';

const calloutRightNoLogin =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-service-right-nologin.png?alt=media&token=eaa45387-efcc-403e-a6ad-3e4357b0f3da';

const Wrap = styled.div`
  ${props =>
    props.isNoLogin &&
    `
      position: relative;
      margin: auto auto auto 4%;
      &:after {
        content: '';
        position: absolute;
        background-repeat: no-repeat;
        background-size: cover;
        width: 200px;
        height: 273px;
        top: -74px;
        right: -200px;
        background-image: url(${calloutRightNoLogin});
      }
    `};
  ${media.desktop`
    ${props =>
      props.isNoLogin &&
      `
        margin: auto auto auto 2%;
        &:after {
          right: -160px;
        }
      `};
  `};
  ${media.tablet1`
    ${props =>
      props.isNoLogin &&
      `
        margin: auto;
        &:after {
          display: none;
        }
      `};
  `};
  ${media.tablet`
    ${props =>
      props.isNoLogin &&
      `
        margin: auto auto ${Dimens.medium_20}px;
      `};
  `};
`;

const TitleMain = styled(CatchPhrase)`
  ${props =>
    props.isNoLogin &&
    `
      text-align: left;
    `};
  ${media.giant`
    ${props =>
      props.isNoLogin &&
      `
        font-size: ${FontSizes.xxlarge_42}px;
      `};
  `};
  ${media.desktop`
    ${props =>
      props.isNoLogin &&
      `
        font-size: ${FontSizes.large}px;
        line-height: normal;
      `};
  `};
  ${media.tablet1`
    ${props =>
      props.isNoLogin &&
      `
        font-size: ${FontSizes.xxlarge}px;
        text-align: center;
      `};
  `};
  ${media.phone`
    ${props =>
      props.isNoLogin &&
      `
        font-size: ${FontSizes.medium3}px;
      `};
  `};
`;

const TitleSub = styled(CatchPhraseSub)`
  ${props =>
    props.isNoLogin &&
    `
      text-align: left;
    `};
  ${media.tablet1`
    ${props =>
      props.isNoLogin &&
      `
        text-align: center;
      `};
  `};
`;

const BrStyled = styled.br`
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

const getTitle = isNoLogin => {
  return (
    <Fragment>
      {isNoLogin ? (
        <Fragment>
          置き場に困った荷物を
          <br />
          モノオクで預けよう
        </Fragment>
      ) : (
        <Fragment>
          近所のスペースを
          <BrStyled />
          探してみよう
        </Fragment>
      )}
    </Fragment>
  );
};

export default ({ isNoLogin }) => (
  <Wrap isNoLogin={isNoLogin}>
    <TitleSub isNoLogin={isNoLogin}>物置シェアサービス「モノオク」</TitleSub>
    <TitleMain isNoLogin={isNoLogin}>{getTitle(isNoLogin)}</TitleMain>
  </Wrap>
);
