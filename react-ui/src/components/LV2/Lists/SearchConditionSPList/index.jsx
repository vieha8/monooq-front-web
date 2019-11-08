import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';
import { Dimens, FontSizes, Colors } from 'variables';

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
  position: relative;
  display: inline-block;
  width: 100%;
  border-top: 1px solid ${Colors.lightGray2};
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: ${Dimens.medium_20}px;
    right: ${Dimens.medium}px;
    width: ${Dimens.small2}px;
    height: ${Dimens.small2}px;
    border-top: 2px solid ${Colors.lightGray2};
    border-right: 2px solid ${Colors.lightGray2};
    transform: rotate(45deg);
  }
`;

const CollapsibleItemLink = styled(Link)`
  display: block;
  width: 100%;
  padding: ${Dimens.small2_15}px ${Dimens.medium}px ${Dimens.small2_15}px ${Dimens.medium2_38}px;
  font-weight: bold;
  color: ${Colors.black2};
`;

const PrefectureWrap = styled.div`
  font-size: ${FontSizes.medium}px;
  font-weight: bold;
  line-height: normal;
`;

const PrefectureName = title => {
  return <PrefectureWrap>{title}</PrefectureWrap>;
};

export default ({ searchConditionSPList }) => (
  <Wrap>
    <ConditionList>
      {searchConditionSPList.map((item, i) => (
        <Item key={i.toString()} className="item-condition-search">
          <Collapsible trigger={PrefectureName(item.title)}>
            <CollapsibleItemList>
              {item.collapsibleItemList.map((itemJ, j) => (
                <CollapsibleItem key={j.toString()}>
                  <CollapsibleItemLink to={itemJ.to || ''}>{itemJ.text}</CollapsibleItemLink>
                </CollapsibleItem>
              ))}
            </CollapsibleItemList>
          </Collapsible>
        </Item>
      ))}
    </ConditionList>
  </Wrap>
);
