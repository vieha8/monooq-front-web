import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Modal } from 'semantic-ui-react';
import { Dimens, FontSizes, Colors, ZIndexes } from 'variables';
import Button from 'components/LV1/Forms/Button';
import CloseIcon from 'components/LV2/ButtonHeader/CloseIcon';
import CityTownAreaList from 'components/LV2/Lists/CityTownAreaList';
import SearchConditionCurrentList from 'components/LV2/Lists/SearchConditionCurrentList';
import PrefectureList from 'components/LV3/PrefectureList';

const Wrap = styled.div`
  display: block;
  ${media.tablet`
    display: none;
  `};
`;

const CloseIconWrap = styled.div`
  margin-left: -2px;
  margin: ${Dimens.medium}px auto ${Dimens.medium1_25}px ${Dimens.medium}px;
`;

const CityTownAreaListWrap = styled.div`
  margin: auto;
  max-width: 1000px;
  padding: 0 ${Dimens.medium}px;
  ${props =>
    props.isCityTownAreaList &&
    `
      padding: 0 ${Dimens.medium}px 25px;
  `};
`;

const SearchConditionWrap = styled.div`
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: ${Dimens.medium_22}px ${Dimens.medium}px;
`;

const SearchConditionLeft = styled.div`
  width: 100%;
  font-size: ${FontSizes.small}px;
  font-weight: bold;
`;

const SearchConditionRight = styled.div`
  margin: auto;
`;

const MoreButtonWrap = styled.div`
  width: 200px;
  margin: auto;
`;

const BottomWrap = styled.div`
  width: 100%;
  min-width: 768px;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: ${ZIndexes.modal};
  background-color: ${Colors.white};
  border-top: 1px solid ${Colors.borderGray};
`;

class SearchConditionMore extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  getIsChecked = cityTownAreaList =>
    cityTownAreaList
      .map(item => item.townAreaList.filter(town => town.isChecked).length > 0 && 1)
      .indexOf(1) === -1;

  render() {
    const {
      btnText,
      regionPrefectureList,
      cityTownAreaList,
      prefecture,
      searchConditionCurrentList,
      onClickMore,
      onClickCheckCity,
      onClickCheckTown,
    } = this.props;
    const { open } = this.state;

    return (
      <Wrap>
        <Button
          primary
          height={42}
          heightTab={42}
          padding="10px 10px"
          paddingTab="10px 10px"
          borderbold
          fontbold
          fill={1}
          onClick={this.open}
        >
          {btnText}
        </Button>
        <Modal
          size="large"
          open={open}
          onClose={this.close}
          className="ButtonModalSearchConditionMore pc"
        >
          <Modal.Content scrolling>
            <CloseIconWrap>
              <CloseIcon onClick={this.close} />
            </CloseIconWrap>
            <CityTownAreaListWrap isCityTownAreaList={cityTownAreaList.length > 0}>
              {cityTownAreaList.length === 0 && <PrefectureList list={regionPrefectureList} />}
              {cityTownAreaList.length > 0 && (
                <CityTownAreaList
                  cityTownAreaList={cityTownAreaList}
                  prefecture={prefecture}
                  onClickCheckCity={onClickCheckCity}
                  onClickCheckTown={onClickCheckTown}
                />
              )}
            </CityTownAreaListWrap>
            {cityTownAreaList.length > 0 && (
              <BottomWrap>
                <SearchConditionWrap>
                  <SearchConditionLeft>
                    <SearchConditionCurrentList
                      searchConditionCurrentList={searchConditionCurrentList}
                      modal
                    />
                  </SearchConditionLeft>
                  <SearchConditionRight>
                    <MoreButtonWrap>
                      <Button
                        primary
                        height={42}
                        heightTab={42}
                        padding="10px 10px"
                        paddingTab="10px 10px"
                        onClick={onClickMore}
                        disabled={this.getIsChecked(cityTownAreaList)}
                      >
                        この条件で検索する
                      </Button>
                    </MoreButtonWrap>
                  </SearchConditionRight>
                </SearchConditionWrap>
              </BottomWrap>
            )}
          </Modal.Content>
        </Modal>
      </Wrap>
    );
  }
}

export default SearchConditionMore;
