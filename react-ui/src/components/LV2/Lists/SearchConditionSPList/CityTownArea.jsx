import React from 'react';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';
import { Dimens, FontSizes, Colors } from 'variables';
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

const Fuga = styled.input`
  display: none;
`;
const BB = styled.div`
  height: 24px;
  width: 24px;
  border: 1px solid #d8d8d8;
  margin-right: 9.6px;

  input[type='checkbox']:checked + & {
    background-color: #e85258;
    background-image: url(/static/media/icon-check.b3761c92.svg);
    background-size: 76%;
    background-position: center center;
    background-repeat: no-repeat;
    border: none;
  }
`;

const Hoge = styled.label`
  font-size: 16px;
  height: 54px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px 16px 15px 38px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const CityName = title => {
  return (
    <CityWrap>
      <ImageAreaPin src={IconAreaGray} alt="icon-area" />
      {title}
    </CityWrap>
  );
};

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
              {item.townAreaList.map((town, j) => (
                <CollapsibleItem key={`item_citytownarea_${j}`.toString()}>
                  <Hoge htmlFor={`searchTwonAreaCheck${town.code}`}>
                    <Fuga type="checkbox" id={`searchTwonAreaCheck${town.code}`} />
                    <BB />
                    {`${town.text}(${town.count})`}
                  </Hoge>
                </CollapsibleItem>
              ))}
            </CollapsibleItemList>
          </Collapsible>
        </Item>
      ))}
    </ConditionList>
  </Wrap>
);
