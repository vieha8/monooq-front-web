import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors } from 'variables';
import PageDefault from 'components/LV1/PageDefault';
import TopViewTitle from 'components/LV2/Texts/TopViewTitle';
import SearchForm from 'components/LV3/Top/SearchForm';

const mainVisual =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-hero.png?alt=media&auto=format&auto=compress';
const mainVisualSp =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-hero-sp.png?alt=media&auto=format&auto=compress';
const calloutLeft =
  'https://monooq.imgix.net/img%2Fservice%2Fcallout-left.png?alt=media&auto=format&auto=compress';
const calloutRight =
  'https://monooq.imgix.net/img%2Fservice%2Fcallout-right.png?alt=media&auto=format&auto=compress';

const Wrap = styled.div`
  width: 100%;
  height: ${props => (props.isNoLogin ? '630' : '512')}px;
  background-image: url(${mainVisual});
  background-size: cover;
  color: ${Colors.white};
  background-repeat: no-repeat;
  background-position: top center;
  ${media.tablet`
    ${props =>
      props.isNoLogin &&
      `
        height: 750px;
      `};
  `};
  ${media.phone`
    height: ${props => (props.isNoLogin ? '754' : '328')}px;
    background-image: url(${mainVisualSp});
    background-position: top center;
  `};
`;

const TopViewWrap = styled.div`
  min-width: 320px;
  height: 100%;
  padding-top: ${props => (props.isNoLogin ? '109' : '209')}px;
  box-sizing: border-box;
  ${media.giant1`
    padding-top: ${props => (props.isNoLogin ? '109' : '224')}px;
  `};
  ${media.tablet`
    padding-top: ${props => (props.isNoLogin ? '120' : '158')}px;
  `};
  ${media.phone`
    padding-top: ${props => (props.isNoLogin ? '100' : '98')}px;
  `};
`;

const TopViewContainer = styled(PageDefault)`
  position: relative;
  &:before,
  &:after {
    content: '';
    position: absolute;
    background-repeat: no-repeat;
    background-size: cover;
  }
  ${props =>
    props.isNoLogin
      ? `
      height: 436px;
      display: flex;
      `
      : `
      &:before {
        width: 330px;
        height: 160px;
        top: -114px;
        left: -58px;
        background-image: url(${calloutLeft});
      }
      &:after {
        width: 416px;
        height: 166px;
        top: -104px;
        right: -40px;
        background-image: url(${calloutRight});
      }
      `};
  ${media.giant1`
    ${props =>
      !props.isNoLogin &&
      `
        &:before {
          top: -130px;
          left: -4px;
        }
        &:after {
          top: -130px;
          right: 0px;
        }
      `};
  `};
  ${media.tablet`
    height: auto;
    &:before,
    &:after {
      display: none;
    }
    ${props =>
      props.isNoLogin &&
      `
        flex-direction: column-reverse;
      `};
  `};
`;

const InputSearchWrap = styled.div`
  margin: ${Dimens.medium_20}px auto ${Dimens.medium3_40}px;
`;

export default () => (
  <Wrap id="topview">
    <TopViewWrap className="wrapTopView">
      <TopViewContainer className="container-topview">
        <TopViewTitle />
        <InputSearchWrap>
          <SearchForm />
        </InputSearchWrap>
      </TopViewContainer>
    </TopViewWrap>
  </Wrap>
);
