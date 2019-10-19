// @flow

import React from 'react';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';
import { Dimens, FontSizes, Colors } from 'variables';
import CheckBox from 'components/LV1/Forms/CheckBox';
import AreaAroundList from 'components/LV2/Lists/AreaAroundList';
import IconAreaGray from 'images/icon-area-gray.png';

const Wrap = styled.div``;

const ConditionList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.li`
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const CollapsibleItemList = styled.ul`
  text-align: left;
`;

const CollapsibleItem = styled.li`
  width: 100%;
  padding: ${Dimens.small2_15}px ${Dimens.medium}px ${Dimens.small2_15}px ${Dimens.medium2_38}px;
  font-weight: bold;
  color: ${Colors.black2};
  border-top: 1px solid ${Colors.lightGray2};
  ${props =>
    props.areaAroundList &&
    `
      padding: ${Dimens.xxsmall_4}px ${Dimens.medium}px;
  `};
`;

const CityWrap = styled.div`
  font-size: ${FontSizes.medium}px;
  font-weight: bold;
  line-height: normal;
`;

const ImageAreaPin = styled.img`
  width: ${Dimens.medium_18}px;
  margin-right: ${Dimens.small2}px;
  margin-bottom: ${Dimens.xxsmall_4}px;
  vertical-align: text-top;
`;

const CityName = title => {
  return (
    <CityWrap>
      <ImageAreaPin src={IconAreaGray} alt="icon-area" />
      {title}
    </CityWrap>
  );
};

const AreaPinList = styled.ul`
  width: 100%;
  white-space: nowrap;
  padding: ${Dimens.small2}px ${Dimens.xxsmall}px ${Dimens.small2_15}px;
`;

export type PropTypes = {
  searchConditionSPList: Array<{
    title: string,
    collapsibleItemList: Array<{
      to: string,
      text: string,
    }>,
    areaAroundList: Array<{
      text: string,
      link: string,
    }>,
  }>,
};

// TODO: ★改修途中(このあとの実装で拡張予定なので、参考ソースはそのまま配置してある状態)★
export default ({ searchConditionSPList, onClickCheckTown }: PropTypes) => (
  <Wrap>
    <ConditionList>
      {searchConditionSPList.map((item, i) => (
        <Item key={`item_citytownarea_${i}`.toString()} className="item-condition-search">
          <Collapsible trigger={CityName(item.cityName)}>
            <CollapsibleItemList>
              {item.areaAroundList.length > 0 && (
                <CollapsibleItem areaAroundList>
                  <AreaPinList>
                    <AreaAroundList
                      caption="人気エリアタグ"
                      captionColor={Colors.lightGray3}
                      areaAroundList={item.areaAroundList}
                      isNoScroll
                    />
                  </AreaPinList>
                </CollapsibleItem>
              )}
              {item.townAreaList.map((town, j) => (
                <CollapsibleItem key={`item_citytownarea_${j}`.toString()}>
                  <CheckBox
                    label={town.text}
                    checked={town.isChecked}
                    options={{ code: town.code }}
                    onClickCheck={onClickCheckTown}
                  />
                </CollapsibleItem>
              ))}
            </CollapsibleItemList>
          </Collapsible>
        </Item>
      ))}
    </ConditionList>
  </Wrap>
);
