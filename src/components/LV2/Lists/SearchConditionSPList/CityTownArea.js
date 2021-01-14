import React from 'react';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';
import { Dimens, FontSizes, Colors } from 'variables';

const IconAreaGray = 'https://monooq.imgix.net/img%2Fservice%2Ficon-area-gray.svg?auto=compress';

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

const HiddenCheckbox = styled.input`
  display: none;
`;
const DummyCheckbox = styled.div`
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

const CheckboxLabel = styled.label`
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

export default ({ searchConditionSPList, onClickCheckTown }) => {
  const checkedTownCount = searchConditionSPList.map(
    item => item.townAreaList.filter(town => town.isChecked).length,
  );
  const isOpeningBoolsDefault = checkedTownCount.map(item => item > 0);

  const [isOpeningBools, setIsOpeningBools] = React.useState(isOpeningBoolsDefault);

  const setIsOpening = React.useCallback(
    (i, val) => {
      const copy = [...isOpeningBools];
      copy[i] = val;
      setIsOpeningBools(copy);
    },
    [isOpeningBools],
  );

  const onCollapsibleClick = React.useCallback(
    indexStr => {
      const index = parseInt(indexStr);
      const current = isOpeningBools[index];

      setIsOpening(index, isOpeningBoolsDefault[index] || !current);
    },
    [isOpeningBools, isOpeningBoolsDefault, setIsOpening],
  );

  const onTownChangeFactory = React.useCallback(
    (town, i) => {
      return e => {
        onClickCheckTown(null, { code: town.code, checked: e.target.checked });
        if (checkedTownCount[i] === 1 && !e.target.checked) {
          setIsOpening(i, false);
        }
      };
    },
    [checkedTownCount, setIsOpening, onClickCheckTown],
  );

  return (
    <Wrap>
      <ConditionList>
        {searchConditionSPList.map((item, i) => (
          <Item key={`item_citytownarea_${i}`.toString()} className="item-condition-search">
            <Collapsible
              trigger={CityName(`${item.cityName}(${item.count})`)}
              accordionPosition={`${i}`}
              open={isOpeningBools[i]}
              handleTriggerClick={onCollapsibleClick}
            >
              <CollapsibleItemList>
                {item.townAreaList.map((town, j) => (
                  <CollapsibleItem key={`item_citytownarea_${j}`.toString()}>
                    <CheckboxLabel htmlFor={`searchTwonAreaCheck${town.code}`}>
                      <HiddenCheckbox
                        checked={town.isChecked}
                        onChange={onTownChangeFactory(town, i)}
                        type="checkbox"
                        id={`searchTwonAreaCheck${town.code}`}
                      />
                      <DummyCheckbox />
                      {`${town.text}(${town.count})`}
                    </CheckboxLabel>
                  </CollapsibleItem>
                ))}
              </CollapsibleItemList>
            </Collapsible>
          </Item>
        ))}
      </ConditionList>
    </Wrap>
  );
};
