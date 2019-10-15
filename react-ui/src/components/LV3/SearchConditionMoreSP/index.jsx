// @flow

import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Modal } from 'semantic-ui-react';
import { Dimens, FontSizes, Colors } from 'variables';
import Hr from 'components/LV1/HorizontalRule';
import ButtonLV1 from 'components/LV1/Forms/Button';
import ButtonBottom from 'components/LV2/Forms/ButtonBottom';
import CloseIcon from 'components/LV2/ButtonHeader/CloseIcon';
import SearchIcon from 'components/LV2/ButtonHeader/SearchIcon';
// import CityTownAreaList from 'components/LV2/Lists/CityTownAreaList';
import SearchConditionCurrentList from 'components/LV2/Lists/SearchConditionCurrentList';
import SearchConditionSPList from 'components/LV2/Lists/SearchConditionSPList';
import SearchConditionSPListCityTownArea from 'components/LV2/Lists/SearchConditionSPList/CityTownArea';

const CloseIconWrap = styled.div`
  display: none;
  ${media.tablet`
    display: block;
    margin-left: -2px;
    margin: ${Dimens.medium}px auto ${Dimens.medium1_25}px ${Dimens.medium}px;
  `};
`;

const SearchConditionWrap = styled.div`
  display: none;
  ${media.tablet`
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: auto ${Dimens.medium}px;
  `};
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
        top: 8px;
        left: -20px;
        width: 12px;
        height: 12px;
        border-top: 2px solid ${Colors.black2};
        border-right: 2px solid ${Colors.black2};
        transform: rotate(225deg);
      }
  `};
`;

type PropTypes = {
  btnText: string,
  // cityTownAreaList: Array<{
  //   cityName: string,
  //   areaAroundList: Array<{
  //     text: string,
  //     link: string,
  //   }>,
  //   townAreaList: Array<{
  //     text: string,
  //     link: string,
  //   }>,
  // }>,
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
};

// TODO: ★改修途中(このあとの実装で拡張予定なので、参考ソースはそのまま配置してある状態)★
class ButtonModalSearchConditionMore extends Component<PropTypes> {
  // TODO: 開発向けに初期trueにしたら、あとで戻しておく。
  state = {
    open: false,
    isTownArea: false,
  };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    const {
      searchIcon,
      btnText,
      // cityTownAreaList,
      searchConditionCurrentList,
      searchConditionSPList,
    } = this.props;
    const { open, isTownArea } = this.state;

    return (
      <Fragment>
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
                  <Headline isTownArea>
                    {/* TODO: リンク実装(全画面遷移) */}
                    都道府県を選択
                  </Headline>
                  <SearchConditionSPListCityTownArea
                    searchConditionSPList={searchConditionSPList}
                  />
                </SearchConditionPrefectureWrap>
                <ButtonBottom
                  text="この条件で検索する"
                  // TODO: あとで実装する
                  // onClick={onClickButtonBottom}
                  // onKeyDownButton={onKeyDownButtonBottom}
                />
              </Fragment>
            ) : (
              <Fragment>
                <SearchConditionWrap>
                  <SearchConditionCurrentList
                    searchConditionCurrentList={searchConditionCurrentList}
                  />
                </SearchConditionWrap>
                <Hr margin="10px 0 20px" />
                <SearchConditionPrefectureWrap>
                  <Headline>スペースを探す</Headline>
                  <SearchConditionSPList searchConditionSPList={searchConditionSPList} />
                </SearchConditionPrefectureWrap>
              </Fragment>
            )}
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }
}

export default ButtonModalSearchConditionMore;
