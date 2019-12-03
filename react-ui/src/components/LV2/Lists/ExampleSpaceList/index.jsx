import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media, mediaMin } from 'helpers/style/media-query';
import { Dimens, Colors, FontSizes } from 'variables';

const ExampleListUl = styled.ul``;

const Item = styled.li`
  position: relative;
  margin-bottom: calc(100vw / 20);
  overflow: hidden;
`;

const PickupListLiImage = styled.img`
  width: 40%;
  float: left;
  border-radius: 4px;
  ${media.tablet`
    width: 100%;
    float: unset;
  `};
`;

const ExampleListLiSection = styled.div`
  margin-left: 43%;
  margin-bottom: 0.6em;
  ${props =>
    props.table &&
    `
      border: solid 3px rgb(188, 188, 188, 0.2);
      padding: 1em 1em 0;
    `};
  ${media.tablet`
    margin-left: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(255,255,255,.7);
    ${props =>
      props.table &&
      `
        position: relative;
        box-sizing: border-box;
      `};
  `};
`;

const ExampleListLiSectionDl = styled.dl`
  overflow: hidden;
  margin-bottom: 1em;
`;

const ExampleListLiSectionDlDt = styled.dt`
  float: left;
  color: #fff;
  width: 6em;
  padding: 5px 0;
  text-align: center;
  background: rgb(188, 188, 188);
  ${props =>
    props.s_bg &&
    `
      height: 6vw;
      width: 6vw;
      border-radius: 12vw;
      position: relative;
      background-color: ${Colors.brandPrimary};
    `};
  ${media.tablet`
    ${props =>
      props.s_bg &&
      `
        height: 20vw;
        width: 20vw;
      `};
  `};
`;

const ExampleListLiSectionDlDtSpan = styled.span`
  color: #fff;
  font-size: calc(100vw / 50);
  white-space: nowrap;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  ${media.tablet`
    font-size: calc(100vw / 17);
  `};
`;

const ExampleListLiSectionDlDd = styled.dd`
  margin-left: 7em;
  padding: ${Dimens.xxsmall}px 0;
  text-align: left;
  font-weight: 100;
`;

const ExampleListLiSectionDlDdSpan = styled.span`
  display: block;
  font-size: 1.2em;
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
`;

const ExampleCaption = styled.p`
  text-align: right;
`;

export default ({ list }) => (
  <Fragment>
    <ExampleListUl>
      {list &&
        list.map((item, i) => (
          <Item key={i.toString()}>
            <PickupListLiImage src={item.spaceImage} alt="" />
            <ExampleListLiSection>
              <ExampleListLiSectionDl>
                <ExampleListLiSectionDlDt s_bg>
                  <ExampleListLiSectionDlDtSpan>収入</ExampleListLiSectionDlDtSpan>
                </ExampleListLiSectionDlDt>
                <ExampleListLiSectionDlDd>
                  <ExampleListLiSectionDlDdSpan>{item.spaceAddress}</ExampleListLiSectionDlDdSpan>
                  <ExampleListLiSectionDlDdSpan price>
                    {`${item.spacePrice}円`}
                  </ExampleListLiSectionDlDdSpan>
                  <ExampleListLiSectionDlDdSpan>
                    {`[内訳]${item.spacePriceDtail}`}
                  </ExampleListLiSectionDlDdSpan>
                </ExampleListLiSectionDlDd>
              </ExampleListLiSectionDl>
            </ExampleListLiSection>
            <ExampleListLiSection table>
              <ExampleListLiSectionDl>
                <ExampleListLiSectionDlDt>保管料金</ExampleListLiSectionDlDt>
                <ExampleListLiSectionDlDd>
                  <ExampleListLiSectionDlDdSpan>
                    {`${item.examplePriceMonth}円/月`}
                  </ExampleListLiSectionDlDdSpan>
                </ExampleListLiSectionDlDd>
              </ExampleListLiSectionDl>
              <ExampleListLiSectionDl>
                <ExampleListLiSectionDlDt>スペース</ExampleListLiSectionDlDt>
                <ExampleListLiSectionDlDd>
                  <ExampleListLiSectionDlDdSpan>{item.exampleSpace}</ExampleListLiSectionDlDdSpan>
                </ExampleListLiSectionDlDd>
              </ExampleListLiSectionDl>
              <ExampleListLiSectionDl>
                <ExampleListLiSectionDlDt>保管期間</ExampleListLiSectionDlDt>
                <ExampleListLiSectionDlDd>
                  <ExampleListLiSectionDlDdSpan>{item.exampleTerm}</ExampleListLiSectionDlDdSpan>
                </ExampleListLiSectionDlDd>
              </ExampleListLiSectionDl>
              <ExampleListLiSectionDl>
                <ExampleListLiSectionDlDt>保管物</ExampleListLiSectionDlDt>
                <ExampleListLiSectionDlDd>
                  <ExampleListLiSectionDlDdSpan marginBottom>
                    {item.exampleItem}
                  </ExampleListLiSectionDlDdSpan>
                  {item.exampleItemDetail}
                </ExampleListLiSectionDlDd>
              </ExampleListLiSectionDl>
            </ExampleListLiSection>
            <ExampleCaption>※20%はモノオクの手数料</ExampleCaption>
          </Item>
        ))}
    </ExampleListUl>
  </Fragment>
);
