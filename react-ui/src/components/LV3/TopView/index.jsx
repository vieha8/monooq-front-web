import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors } from 'variables';
import PageDefault from 'components/LV1/PageDefault';
import CatchPhrase from 'components/LV1/Texts/CatchPhrase';
import CatchPhraseSub from 'components/LV1/Texts/CatchPhraseSub';
import TopSearchForm from 'components/LV3/TopSearchForm';

const mainVisual =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-hero.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const mainVisualSp =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-hero-sp.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const calloutLeft =
  'https://monooq.imgix.net/img%2Fservice%2Fcallout-left.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';
const calloutRight =
  'https://monooq.imgix.net/img%2Fservice%2Fcallout-right.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format';

const Wrap = styled.div`
  height: 512px;
  background-image: url(${mainVisual});
  background-size: cover;
  color: ${Colors.white};
  background-repeat: no-repeat;
  background-position: top center;
  ${media.phone`
    height: 328px;
    background-image: url(${mainVisualSp});
    background-position: top center;
  `};
`;

const TopViewWrap = styled.div`
  min-width: 320px;
  height: 100%;
  padding-top: 209px;
  box-sizing: border-box;
  ${media.giant1`
    padding-top: 224px;
  `};
  ${media.tablet`
    padding-top: 158px;
  `};
  ${media.phone`
    padding-top: 98px;
  `};
`;

const TopViewContainer = styled(PageDefault)`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 330px;
    height: 160px;
    top: -114px;
    left: -58px;
    background-image: url(${calloutLeft});
    background-repeat: no-repeat;
    background-size: cover;
  }
  &:after {
    content: '';
    position: absolute;
    width: 416px;
    height: 166px;
    top: -104px;
    right: -40px;
    background-image: url(${calloutRight});
    background-repeat: no-repeat;
    background-size: cover;
  }
  ${media.giant1`
    &:before {
      top: -130px;
      left: -4px;
    }
    &:after {
      top: -130px;
      right: 0px;
    }
  `};
  ${media.tablet`
    &:before,
    &:after {
      display: none;
    }
  `};
`;

const InputSearchWrap = styled.div`
  margin-top: ${Dimens.medium_20}px;
  margin-bottom: ${Dimens.medium3_40}px;
`;

const BrStyled = styled.br`
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

export default () => (
  <Wrap>
    <TopViewWrap className="wrapTopView">
      <TopViewContainer className="container-topview">
        <CatchPhraseSub>物置シェアサービス「モノオク」</CatchPhraseSub>
        <CatchPhrase>
          近所のスペースを
          <BrStyled />
          探してみよう
        </CatchPhrase>
        <InputSearchWrap>
          <TopSearchForm />
        </InputSearchWrap>
      </TopViewContainer>
    </TopViewWrap>
  </Wrap>
);
