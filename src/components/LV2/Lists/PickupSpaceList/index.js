import React, { Fragment } from 'react';
import Path from 'config/path';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media, mediaMin } from 'helpers/style/media-query';
import { Dimens, Colors, FontSizes } from 'variables';

const Item = styled.div`
  max-width: 825px;
  margin: auto;
  border-radius: 6px;
  padding: ${Dimens.small2_15}px ${Dimens.small2_15}px 0;
  margin-bottom: ${Dimens.small2_15}px;
  background: #fff;
  box-shadow: 0.5px 0px 3px #333;
  ${media.phone`
    padding: 0;
  `};
`;

const InfoBasic = styled.div`
  overflow: hidden;
`;

const SpaceImageWrap = styled.div`
  position: relative;
  text-align: center;
`;

const SpaceImage = styled.img`
  width: 100%;
  max-width: 250px;
  height: auto;
  float: left;
  ${media.tablet`
    max-width: 160px;
  `};
  ${media.phone`
    max-width: 100%;
    border-top-left-radius: ${Dimens.xsmall}px;
    border-top-right-radius: ${Dimens.xsmall}px;
    float: none;
  `};
`;

const SpaceImagePrice = styled.span`
  display: none;
  ${media.phone`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1;
    padding: ${Dimens.small_10}px;
    color: ${Colors.white};
    background-color: rgba(33, 33, 33, 0.6);
  `};
`;

const SpaceDesc = styled.div`
  overflow: hidden;
  margin-left: 270px;
  line-height: 1.8em;
  ${media.tablet`
    margin-left: 170px;
  `};
  ${media.phone`
    margin: 0;
    float: none;
    padding: ${Dimens.small_10}px ${Dimens.small2_15}px 0;
    line-height: 1.5em;
  `};
`;

const LocationWrap = styled.div`
  width: 50%;
  float: left;
  text-align: left;
`;

const LocationTitle = styled.span`
  ${media.phone`
    display: none;
  `};
`;

const SpaceDescDl = styled.dl`
  width: 250px;
  overflow: hidden;
  margin-top: 6px;
  ${media.tablet`
    font-size: ${FontSizes.small_12}px;
  `};
  ${media.phone`
    width: 100%;
    margin: 0 0 10px;
  `};
`;

const SpaceDescDt = styled.dt`
  float: left;
  clear: left;
  width: 70px;
  ${media.tablet`
    width: 55px;
  `};
  ${media.phone`
    width: 45%;
  `};
`;

const SpaceDescDd = styled.dd`
  ${media.phone`
    width: 100%;
  `};
`;

const SpaceDescHostWrap = styled.div`
  margin-top: ${Dimens.small}px;
  margin-bottom: ${Dimens.small_10}px;
  line-height: 1em;
  overflow: hidden;
  padding: ${Dimens.small_10}px ${Dimens.small}px;
  background-color: ${Colors.lightGray9};
  ${media.tablet`
    padding: ${Dimens.xsmall}px ${Dimens.xxsmall_4}px;
  `};
  ${media.phone`
    padding: ${Dimens.xsmall}px;
  `};
`;

const SpaceDescHostImage = styled.img`
  float: none;
  width: ${Dimens.medium2}px;
  vertical-align: middle;
  ${media.tablet`
    width: ${Dimens.medium1_25}px;
  `};
`;

const HostName = styled.span`
  margin-left: 0.3em;
  line-height: 1em;
  ${media.tablet`
    font-size: ${FontSizes.small_12}px;
  `};
`;

const SpacePlanUl = styled.ul`
  margin-top: 0;
  padding-top: 0;
  margin: auto -${Dimens.small2_15}px;
  ${media.phone`
    margin: auto;
  `};
`;

const SpacePlanLi = styled.li`
  position: relative;
  margin-bottom: 0;
  border-top: solid 1px #eee;
  text-align: left;
  &:after {
    position: absolute;
    top: 50%;
    right: ${Dimens.medium2}px;
    display: block;
    content: '';
    width: ${Dimens.small}px;
    height: ${Dimens.small}px;
    margin-top: -${Dimens.xxsmall_4}px;
    border-top: 2px solid ${Colors.black};
    border-right: 2px solid ${Colors.black};
    transform: rotate(45deg);
  }
  &:active {
    opacity: 0.8;
  }
  ${media.phone`
    &:after {
      right: ${Dimens.medium_20}px;
    }
  `};
  ${mediaMin.tablet`
    &:hover {
      opacity: 0.8;
    }
  `};
`;

const SpacePlanLiLink = styled(Link)`
  position: relative;
  display: block;
  text-decoration: none;
  line-height: 1.8em;
  padding: 1em 1.2em;
  color: ${Colors.black};
  ${media.phone`
    line-height: 1.6em;
    font-size: small;
    padding-top: ${Dimens.small2}px;
    padding-bottom: ${Dimens.small2}px;
  `};
`;

const SpacePlanLiPrice = styled.span`
  position: absolute;
  top: calc(50% - ${Dimens.medium_18}px);
  right: ${Dimens.medium4_50}px;
  ${media.phone`
    top: calc(50% - ${Dimens.small_9}px);
    right: ${Dimens.medium3_40}px;
    font-weight: bold;
  `};
`;

const PlanLiSmallButton = styled.span`
  display: inline-block;
  font-size: ${FontSizes.small}px;
  background-color: ${Colors.brandPrimary};
  color: ${Colors.white};
  padding: ${Dimens.xxsmall_4}px ${Dimens.small}px;
  margin-left: ${Dimens.small2}px;
  border-radius: ${Dimens.xxsmall_4}px;
  ${media.phone`
    display: none;
  `};
`;

export default ({ list }) => (
  <Fragment>
    {list &&
      list.map((item, i) => (
        <Item key={i.toString()}>
          <InfoBasic>
            <SpaceImageWrap>
              <SpaceImage src={item.spaceImage} alt={item.spaceImageAlt} />
              <SpaceImagePrice>{item.spaceImageprice}</SpaceImagePrice>
            </SpaceImageWrap>
            <SpaceDesc>
              <LocationWrap>
                <LocationTitle>■部屋情報</LocationTitle>
                <SpaceDescDl>
                  <SpaceDescDt>最寄駅</SpaceDescDt>
                  <SpaceDescDd>{item.station}</SpaceDescDd>
                  <SpaceDescDt>徒歩</SpaceDescDt>
                  <SpaceDescDd>{item.walk}</SpaceDescDd>
                  <SpaceDescDt>タイプ</SpaceDescDt>
                  <SpaceDescDd>{item.type}</SpaceDescDd>
                </SpaceDescDl>
              </LocationWrap>
              <LocationWrap backage>
                <LocationTitle>■荷物情報</LocationTitle>
                <SpaceDescDl>
                  <SpaceDescDt>対応荷物</SpaceDescDt>
                  <SpaceDescDd>{item.backage}</SpaceDescDd>
                  <SpaceDescDt>受取方法</SpaceDescDt>
                  <SpaceDescDd>{item.delivery}</SpaceDescDd>
                </SpaceDescDl>
                <SpaceDescHostWrap>
                  <SpaceDescHostImage src={item.hostImage} alt={item.hostImageAlt} />
                  <HostName>{item.hostName}</HostName>
                </SpaceDescHostWrap>
              </LocationWrap>
            </SpaceDesc>
          </InfoBasic>
          <SpacePlanUl>
            {item.priceList &&
              item.priceList.map((itemPrice, j) => (
                <SpacePlanLi key={j.toString()}>
                  <SpacePlanLiLink to={Path.space(item.spaceId)}>
                    {itemPrice.title}
                    <SpacePlanLiPrice>
                      {itemPrice.price}
                      <PlanLiSmallButton>詳細をみる</PlanLiSmallButton>
                    </SpacePlanLiPrice>
                  </SpacePlanLiLink>
                </SpacePlanLi>
              ))}
          </SpacePlanUl>
        </Item>
      ))}
  </Fragment>
);
