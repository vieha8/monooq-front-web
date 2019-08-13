// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';
import ContainerDefaultStyled from 'components/LV1/ContainerDefault/ContainerDefaultStyled';
import Button from 'components/LV1/Forms/Button';
import ContentExplain from 'components/LV2/Texts/ContentExplain';
import ForSafeList from 'components/LV2/Lists/ForSafeList';

const topImage1 =
  'https://monooq.imgix.net/img%2Fservice%2Ftop1%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&w=500';
const topImage1Sp =
  'https://monooq.imgix.net/img%2Fservice%2Ftop1_sp%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&w=400';
const topImage2 =
  'https://monooq.imgix.net/img%2Fservice%2Ftop2%402x.png?alt=media&token=eead5b9f-4edf-4f1b-8005-a961f9af062d&auto=format&w=500';

const UserReasonContainer = styled(ContainerDefaultStyled)`
  background-image: url(${topImage1});
  background-repeat: no-repeat;
  background-position: right;
  background-position-y: 388px;
  background-size: 50%;
  ${media.phone`
      background-image: url(${topImage1Sp});
      background-position: right 0 bottom 30px;
      background-size: contain;
      padding-bottom: 40vh;
  `};
`;

const HostReasonBackground = styled.div`
  background-image: url(${topImage2});
  background-repeat: no-repeat;
  background-position: left;
  background-size: auto 100%;
  ${media.phone`
    background-image: none;
  `};
`;

const HostReasonContainer = styled(ContainerDefaultStyled)`
  padding: ${Dimens.large4_80}px 0 ${Dimens.large4_80}px 600px;
  box-sizing: border-box;
  ${media.phone`
    padding: ${Dimens.medium3_40}px 0;
  `};
`;

const HilightCopy = styled.span`
  display: block;
  font-size: ${FontSizes.small}px;
  line-height: ${FontSizes.small * 1.5}px;
  margin-bottom: ${Dimens.small}px;
  color: ${Colors.brandPrimary};
`;

const DefaultTitle = styled.span`
  display: inline-block;
  font-size: ${FontSizes.xxlarge}px;
  line-height: ${FontSizes.xxlarge * 1.5}px;
  margin-bottom: ${Dimens.large4_80}px;
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    line-height: ${FontSizes.medium2 * 1.5}px;
    margin-bottom: ${Dimens.medium3_40}px;
  `};
`;

const ExplainContainer = styled.div`
  width: 100%;
  ${props =>
    props.isUser &&
    `
      width: 48%;
    `};
  ${media.phone`
    width: 100%;
  `};
`;

const ForSafeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${media.phone`
    justify-content: center;
  `};
`;

type PropTypes = {
  hilightcopy: string,
  title: string,
  list: Array<{
    iconClass?: string,
    title: string,
    description: string,
    buttonText?: string,
    onClickItem?: Function,
  }>,
  buttonText: string,
  onClick: Function,
  isUser?: boolearn,
};

export default ({
  hilightcopy,
  title,
  list,
  buttonText,
  onClick,
  isUser,
  isForSafe,
}: PropTypes) => (
  <Fragment>
    {isUser ? (
      <Fragment>
        {isForSafe ? (
          <Fragment>
            <HilightCopy>{hilightcopy}</HilightCopy>
            <DefaultTitle>{title}</DefaultTitle>
            <ForSafeContainer className="for-safe-section-list">
              <ForSafeList list={list} />
            </ForSafeContainer>
          </Fragment>
        ) : (
          <UserReasonContainer>
            <HilightCopy>{hilightcopy}</HilightCopy>
            <DefaultTitle>{title}</DefaultTitle>
            <ExplainContainer isUser>
              {list.map((item, i) => (
                <ContentExplain
                  key={i.toString()}
                  title={item.title}
                  description={item.description}
                  isLeft
                />
              ))}
            </ExplainContainer>
          </UserReasonContainer>
        )}
      </Fragment>
    ) : (
      <HostReasonBackground>
        <HostReasonContainer>
          <HilightCopy>{hilightcopy}</HilightCopy>
          <DefaultTitle>{title}</DefaultTitle>
          <ExplainContainer>
            {list.map((item, i) => (
              <ContentExplain
                key={i.toString()}
                title={item.title}
                description={item.description}
              />
            ))}
          </ExplainContainer>
          <Button primary center fontbold onClick={onClick}>
            {buttonText}
          </Button>
        </HostReasonContainer>
      </HostReasonBackground>
    )}
  </Fragment>
);
