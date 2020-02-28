import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors } from 'variables';
import PageDefault from 'components/LV1/PageDefault';
import TopViewTitle from 'components/LV2/Texts/TopViewTitle';
import RegisterEmail from 'components/LV3/RegisterEmail/';
import SearchForm from 'components/LV3/Top/SearchForm';

const mainVisual =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-hero.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const mainVisualSp =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-hero-sp.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const calloutLeft =
  'https://monooq.imgix.net/img%2Fservice%2Fcallout-left.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const calloutRight =
  'https://monooq.imgix.net/img%2Fservice%2Fcallout-right.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const calloutRightNoLogin =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-service-right-nologin.png?alt=media&token=eaa45387-efcc-403e-a6ad-3e4357b0f3da';

const Wrap = styled.div`
  width: 100%;
  height: ${props => (props.isNoLogin ? '612' : '512')}px;
  background-image: url(${mainVisual});
  background-size: cover;
  color: ${Colors.white};
  background-repeat: no-repeat;
  background-position: top center;
  ${media.tablet`
    ${props =>
      props.isNoLogin &&
      `
        height: 712px;
      `};
  `};
  ${media.phone`
    height: ${props => (props.isNoLogin ? '660' : '328')}px;
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
    padding-top: ${props => (props.isNoLogin ? '114' : '224')}px;
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
      display: flex;
      &:after {
        width: 200px;
        height: 273px;
        top: 40px;
        right: 20px;
        background-image: url(${calloutRightNoLogin});
      }
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
      props.isNoLogin
        ? `
        &:after {
          right: 6px;
        }
        `
        : `
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
  ${media.tablet1`
    ${props =>
      props.isNoLogin &&
      `
        &:after {
          display: none;
        }
      `};
  `};
  ${media.tablet`
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

const FormWrap = styled.div`
  width: 100%;
  max-width: 382px;
  padding: ${Dimens.medium_20}px;
  background-color: ${Colors.white};
  border: 1px solid ${Colors.borderGray};
  ${media.giant`
    max-width: 300px;
  `};
  ${media.tablet`
    margin: auto;
  `};
  ${media.phone`
    width: calc(100% - ${Dimens.medium3_40}px);
  `};
`;

const InputSearchWrap = styled.div`
  margin: ${Dimens.medium_20}px auto ${Dimens.medium3_40}px;
`;

export default ({ isNoLogin }) => (
  <Wrap isNoLogin={isNoLogin}>
    <TopViewWrap className="wrapTopView" isNoLogin={isNoLogin}>
      <TopViewContainer className="container-topview" isNoLogin={isNoLogin}>
        {isNoLogin && (
          <FormWrap>
            <RegisterEmail isTop gaLabel="Top Page" />
          </FormWrap>
        )}
        <TopViewTitle isNoLogin={isNoLogin} />
        {!isNoLogin && (
          <InputSearchWrap>
            <SearchForm />
          </InputSearchWrap>
        )}
      </TopViewContainer>
    </TopViewWrap>
  </Wrap>
);
