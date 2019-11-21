import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Modal } from 'semantic-ui-react';
import { Dimens, FontSizes } from 'variables';
import Hr from 'components/LV1/HorizontalRule';
import ButtonLV1 from 'components/LV1/Forms/Button';
import ButtonBottom from 'components/LV3/SearchNarrowButton';
import CloseIcon from 'components/LV2/ButtonHeader/CloseIcon';
import SearchIcon from 'components/LV2/ButtonHeader/SearchIcon';
import SearchConditionCurrentList from 'components/LV2/Lists/SearchConditionCurrentList';
import SearchConditionSPList from 'components/LV2/Lists/SearchConditionSPList';
import SearchConditionSPListCityTownArea from 'components/LV2/Lists/SearchConditionSPList/CityTownArea';

const Wrap = styled.div`
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

const CloseIconWrap = styled.div`
  margin-left: -2px;
  margin: ${Dimens.medium}px auto ${Dimens.medium1_25}px ${Dimens.medium}px;
`;

const ContentWrap = styled.div`
  max-width: 600px;
  margin: auto;
`;

const SearchConditionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: auto ${Dimens.medium}px;
`;

const SearchConditionPrefectureWrap = styled.div`
  text-align: center;
  ${props =>
    props.isTownArea &&
    `
      margin-bottom: 114px;
  `};
`;

const Headline = styled.div`
  position: relative;
  font-size: ${FontSizes.medium_18}px;
  line-height: normal;
  font-weight: bold;
  margin-left: ${Dimens.medium}px;
  margin-bottom: ${Dimens.medium_20}px;
  text-align: left;
`;

class SearchConditionMoreSP extends Component {
  state = {
    open: false,
    isTownArea: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.cityTownAreaList.length > 0 && !state.isTownArea) {
      return { isTownArea: true };
    }
    return null;
  }

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  getIsChecked = cityTownAreaList =>
    cityTownAreaList
      .map(item => item.townAreaList.filter(town => town.isChecked).length > 0 && 1)
      .indexOf(1) === -1;

  render() {
    const {
      searchIcon,
      btnText,
      searchConditionCurrentList,
      cityTownAreaList,
      prefectureList,
      onClickMore,
      onClickCheckCity,
      onClickCheckTown,
    } = this.props;
    const { open, isTownArea } = this.state;

    return (
      <Wrap>
        {searchIcon ? (
          <SearchIcon onClick={this.open} />
        ) : (
          <ButtonLV1 primary borderbold fontbold fill={1} onClick={this.open}>
            {btnText}
          </ButtonLV1>
        )}
        <Modal
          size="large"
          open={open}
          onClose={this.close}
          className="ButtonModalSearchConditionMore"
        >
          <Modal.Content scrolling>
            <CloseIconWrap>
              <CloseIcon onClick={this.close} />
            </CloseIconWrap>
            {isTownArea ? (
              <ContentWrap>
                <SearchConditionPrefectureWrap isTownArea>
                  <SearchConditionSPListCityTownArea
                    searchConditionSPList={cityTownAreaList}
                    onClickCheckCity={onClickCheckCity}
                    onClickCheckTown={onClickCheckTown}
                  />
                </SearchConditionPrefectureWrap>
                <ButtonBottom
                  text="この条件で検索する"
                  onClick={onClickMore}
                  disabled={this.getIsChecked(cityTownAreaList)}
                />
              </ContentWrap>
            ) : (
              <ContentWrap>
                <SearchConditionWrap>
                  <SearchConditionCurrentList
                    searchConditionCurrentList={searchConditionCurrentList}
                  />
                </SearchConditionWrap>
                <Hr
                  width="calc(100% - 32px)"
                  margin={`${Dimens.medium4}px auto`}
                  marginPhone="20px 16px"
                />
                <SearchConditionPrefectureWrap>
                  <Headline>都道府県でスペースを探す</Headline>
                  <SearchConditionSPList searchConditionSPList={prefectureList} />
                </SearchConditionPrefectureWrap>
              </ContentWrap>
            )}
          </Modal.Content>
        </Modal>
      </Wrap>
    );
  }
}

export default SearchConditionMoreSP;
