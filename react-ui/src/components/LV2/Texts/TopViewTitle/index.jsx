import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import CatchPhrase from 'components/LV1/Texts/CatchPhrase';
import CatchPhraseSub from 'components/LV1/Texts/CatchPhraseSub';

const Wrap = styled.div`
  ${props =>
    props.isNoLogin &&
    `
      margin: auto auto auto 5%;
    `};
  ${media.desktop`
    ${props =>
      props.isNoLogin &&
      `
        margin: auto auto auto 2%;
      `};
  `};
  ${media.tablet1`
    ${props =>
      props.isNoLogin &&
      `
        margin: auto;
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
