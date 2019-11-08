import React from 'react';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';
import { Dimens, FontSizes, Colors } from 'variables';
import InputForm from 'components/LV2/Forms/InputForm';
import AreaAroundList from 'components/LV2/Lists/AreaAroundList';
import IconAreaGray from 'images/icon-area-gray.png';

const Wrap = styled.div``;

const ConditionList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: ${Dimens.large4_80}px;
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
  color: ${Colors.black2};
  border-top: 1px solid ${Colors.lightGray2};
  ${props =>
    props.areaAroundList &&
    `
      font-weight: bold;
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

export default ({ searchConditionSPList, onClickCheckTown }) => (
  <Wrap>
    <ConditionList>
      {searchConditionSPList.map((item, i) => (
        <Item key={`item_citytownarea_${i}`.toString()} className="item-condition-search">
          <Collapsible
            trigger={CityName(`${item.cityName}(${item.count})`)}
            open={item.townAreaList.filter(town => town.isChecked).length > 0}
          >
            <CollapsibleItemList>
              {item.areaAroundList.length > 0 && (
                <CollapsibleItem areaAroundList>
                  <AreaPinList>
                    <AreaAroundList
                      caption="人気エリア"
                      captionColor={Colors.lightGray3}
                      areaAroundList={item.areaAroundList}
                      isNoScroll
                    />
                  </AreaPinList>
                </CollapsibleItem>
              )}
              {item.townAreaList.map((town, j) => (
                <CollapsibleItem key={`item_citytownarea_${j}`.toString()}>
                  <InputForm
                    checkbox
                    labelCheckBox={`${town.text}(${town.count})`}
                    checked={town.isChecked}
                    options={{ code: town.code }}
                    onClickCheck={onClickCheckTown}
                    className="list-citytown"
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
