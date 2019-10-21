// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Modal } from 'semantic-ui-react';
import { Dimens, FontSizes, Colors } from 'variables';
import Hr from 'components/LV1/HorizontalRule';
import ButtonLV1 from 'components/LV1/Forms/Button';
import ButtonBottom from 'components/LV2/Forms/ButtonBottom';
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

const SearchConditionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: auto ${Dimens.medium}px;
`;

const SearchConditionPrefectureWrap = styled.div`
  text-align: center;
`;

const Headline = styled.div`
  position: relative;
  font-size: ${FontSizes.medium_18}px;
  line-height: normal;
  font-weight: bold;
  margin-left: ${Dimens.medium}px;
  margin-bottom: ${Dimens.medium_20}px;
  text-align: left;
  ${props =>
    props.isTownArea &&
    `
      margin-left: ${Dimens.medium3_40}px;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: ${Dimens.small}px;
        left: -${Dimens.medium_20}px;
        width: ${Dimens.small2}px;
        height: ${Dimens.small2}px;
        border-top: 2px solid ${Colors.black2};
        border-right: 2px solid ${Colors.black2};
        transform: rotate(225deg);
      }
  `};
`;

type PropTypes = {
  btnText: string,
  searchConditionCurrentList: Array<{
    title: string,
    value: string,
  }>,
  searchConditionSPList: Array<{
    title: string,
    collapsibleItemList: Array<{
      to: string,
      text: string,
    }>,
  }>,
  onClickSearch?: Function,
};

class SearchConditionMoreSP extends Component<PropTypes> {
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
              <Fragment>
                <SearchConditionPrefectureWrap>
                  <Headline isTownArea />
                  <SearchConditionSPListCityTownArea
                    searchConditionSPList={cityTownAreaList}
                    onClickCheckCity={onClickCheckCity}
                    onClickCheckTown={onClickCheckTown}
                  />
                </SearchConditionPrefectureWrap>
                <ButtonBottom text="この条件で検索する" onClick={onClickMore} />
              </Fragment>
            ) : (
              <Fragment>
                <SearchConditionWrap>
                  <SearchConditionCurrentList
                    searchConditionCurrentList={searchConditionCurrentList}
                  />
                </SearchConditionWrap>
                <Hr width="calc(100% - 32px)" marginPhone="20px 16px" />
                <SearchConditionPrefectureWrap>
                  <Headline>都道府県でスペースを探す</Headline>
                  <SearchConditionSPList searchConditionSPList={prefectureList} />
                </SearchConditionPrefectureWrap>
              </Fragment>
            )}
          </Modal.Content>
        </Modal>
      </Wrap>
    );
  }
}

export default SearchConditionMoreSP;
