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

const BackPrefectureLink = styled.a`
  ${props => props.color && `color: ${props.color};`}
  ${props =>
    props.current &&
    `
    color: ${Colors.black};
    pointer-events: none;
  `}
  text-decoration: none;
  :hover {
    ${props => props.color && `color: ${props.color};`}
    opacity: 0.8;
  }
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

class ButtonModalSearchConditionMore extends Component<PropTypes> {
  state = {
    open: false,
    isTownArea: false,
  };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  backSelectPrefecture = () => this.setState({ isTownArea: false });

  render() {
    const {
      searchIcon,
      btnText,
      searchConditionCurrentList,
      searchConditionSPList,
      onClickSearch,
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
                  <Headline isTownArea>
                    <BackPrefectureLink color={Colors.black} onClick={this.backSelectPrefecture}>
                      都道府県を選択
                    </BackPrefectureLink>
                  </Headline>
                  <SearchConditionSPListCityTownArea
                    searchConditionSPList={searchConditionSPList}
                  />
                </SearchConditionPrefectureWrap>
                <ButtonBottom text="この条件で検索する" onClick={onClickSearch} />
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
                  <Headline>スペースを探す</Headline>
                  <SearchConditionSPList searchConditionSPList={searchConditionSPList} />
                </SearchConditionPrefectureWrap>
              </Fragment>
            )}
          </Modal.Content>
        </Modal>
      </Wrap>
    );
  }
}

export default ButtonModalSearchConditionMore;
