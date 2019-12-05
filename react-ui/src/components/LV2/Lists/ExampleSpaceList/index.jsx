import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, Colors, FontSizes } from 'variables';

const List = styled.ul`
  padding: 0 ${Dimens.medium}px;
  ${media.tablet`
    padding: 0;
  `};
`;

const Item = styled.li`
  position: relative;
  margin-bottom: ${Dimens.large4_80}px;
  overflow: hidden;
  ${media.tablet`
    margin-bottom: ${Dimens.medium3_40}px;
  `};
`;

const SpaceImage = styled.img`
  width: 40%;
  float: left;
  border-radius: ${Dimens.xxsmall_4}px;
  ${media.tablet`
    width: 100%;
    float: unset;
    border-radius: 0;
  `};
`;

const ItemSection = styled.div`
  margin-left: 43%;
  ${props =>
    props.table &&
    `
      border: solid 3px rgb(188, 188, 188, 0.2);
      padding: 1em 1em 0;
    `};
  ${media.tablet`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin-left: 0;
    background: rgba(255,255,255,.7);
    ${props =>
      props.table &&
      `
        position: relative;
        box-sizing: border-box;
      `};
  `};
`;

const Dl = styled.dl`
  overflow: hidden;
  margin-bottom: ${Dimens.medium}px;
  ${media.tablet`
    ${props =>
      props.s_bg &&
      `
        margin: ${Dimens.medium}px ${Dimens.xxsmall_5}px;
      `};
  `};
`;

const Dt = styled.dt`
  float: left;
  width: 6em;
  padding: ${Dimens.xxsmall_5}px 0;
  text-align: center;
  color: ${Colors.white};
  background: rgb(188, 188, 188);
  ${props =>
    props.s_bg &&
    `
      position: relative;
      padding: ${Dimens.xxsmall_5}px;
      height: ${Dimens.large4_80}px;
      width: ${Dimens.large4_80}px;
      border-radius: ${Dimens.medium3_45}px;
      background-color: ${Colors.brandPrimary};
    `};
  ${media.tablet`
    ${props =>
      props.s_bg &&
      `
          height: ${Dimens.large_60}px;
          width: ${Dimens.large_60}px;
          border-radius: ${Dimens.medium2_35}px;
      `};
  `};
`;

const CircleText = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-size: ${FontSizes.medium2}px;
  color: ${Colors.white};
`;

const Dd = styled.dd`
  margin-left: 112px;
  padding: ${Dimens.xxsmall}px 0;
  text-align: left;
  ${media.tablet`
    ${props =>
      props.s_bg &&
      `
          margin-left: ${Dimens.large4_80}px;
      `};
  `};
`;

const DdSpan = styled.span`
  display: block;
  font-size: ${FontSizes.medium1}px;
  ${props =>
    props.price &&
    `
      font-size: ${FontSizes.xxlarge_40}px;
      font-weight: bold;
      line-height: 1.2em;
    `};
  ${props =>
    props.marginBottom &&
    `
      margin-bottom: ${Dimens.small_10}px;
    `};

  ${media.tablet`
    font-size: ${FontSizes.medium}px;
    ${props =>
      props.price &&
      `
          font-size: ${FontSizes.medium3}px;
      `};
  `};
`;

const Caption = styled.p`
  text-align: right;
  margin-top: ${Dimens.small_10}px;
`;

export default ({ list }) => (
  <List>
    {list &&
      list.map((item, i) => (
        <Item key={i.toString()}>
          <SpaceImage src={item.spaceImage} alt={item.spaceImageAlt} />
          <ItemSection>
            <Dl s_bg>
              <Dt s_bg>
                <CircleText>収入</CircleText>
              </Dt>
              <Dd s_bg>
                <DdSpan>{item.spaceAddress}</DdSpan>
                <DdSpan price>{`${item.spacePrice}円`}</DdSpan>
                <DdSpan>{`[内訳] ${item.spacePriceDtail}`}</DdSpan>
              </Dd>
            </Dl>
          </ItemSection>
          <ItemSection table>
            <Dl>
              <Dt>保管料金</Dt>
              <Dd>
                <DdSpan>{`${item.examplePriceMonth}円/月`}</DdSpan>
              </Dd>
            </Dl>
            <Dl>
              <Dt>スペース</Dt>
              <Dd>
                <DdSpan>{item.exampleSpace}</DdSpan>
              </Dd>
            </Dl>
            <Dl>
              <Dt>保管期間</Dt>
              <Dd>
                <DdSpan>{item.exampleTerm}</DdSpan>
              </Dd>
            </Dl>
            <Dl>
              <Dt>保管物</Dt>
              <Dd>
                <DdSpan marginBottom>{item.exampleItem}</DdSpan>
                {item.exampleItemDetail}
              </Dd>
            </Dl>
          </ItemSection>
          <Caption>※20%はモノオクの手数料</Caption>
        </Item>
      ))}
  </List>
);
