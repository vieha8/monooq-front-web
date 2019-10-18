// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Modal } from 'semantic-ui-react';
import { Dimens, FontSizes } from 'variables';
import ButtonLV1 from 'components/LV1/Forms/Button';
import CityTownAreaList from 'components/LV2/Lists/CityTownAreaList';
import SearchConditionCurrentList from 'components/LV2/Lists/SearchConditionCurrentList';
import PrefectureList from 'components/LV3/PrefectureList';

const SearchConditionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${Dimens.medium_22}px 0 ${Dimens.medium_22}px ${Dimens.medium_22}px;
  margin-left: ${Dimens.small_10}px;
  ${media.tablet`
    display: none;
  `};
`;

const SearchConditionLeft = styled.div`
  width: 70%;
  font-size: ${FontSizes.small}px;
  font-weight: bold;
`;

const SearchConditionRight = styled.div`
  margin: auto;
`;

const MoreButtonWrap = styled.div`
  width: 200px;
  margin: auto;
  font-size: ${FontSizes.small}px;
  font-weight: bold;
  ${media.tablet`
    max-width: 120px;
    margin: auto;
  `};
`;

type PropTypes = {
  btnText: string,
  regionPrefectureList: Array<{
    region: string,
    prefectureList: Array<{
      name: string,
      id: string,
    }>,
  }>,
  cityTownAreaList: Array<{
    cityName: string,
    areaAroundList: Array<{
      text: string,
      link: string,
    }>,
    townAreaList: Array<{
      text: string,
      link: string,
    }>,
  }>,
  prefecture: string,
  onChangeCheckCity: Function,
  onChangeCheckTownArea: Function,
  searchConditionCurrentList: Array<{
    title: string,
    value: string,
  }>,
  onClickMore: Function,
};

class ButtonModalConfirm extends Component<PropTypes> {
  state = { open: false };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    const {
      btnText,
      regionPrefectureList,
      cityTownAreaList,
      prefecture,
      onChangeCheckCity,
      onChangeCheckTownArea,
      searchConditionCurrentList,
      onClickMore,
    } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <ButtonLV1
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
        </ButtonLV1>
        <Modal size="large" open={open} onClose={this.close}>
          <Modal.Content scrolling>
            <div>{<PrefectureList list={regionPrefectureList} />}</div>
            <div>
              <CityTownAreaList
                cityTownAreaList={cityTownAreaList}
                prefecture={prefecture}
                onChangeCheckCity={onChangeCheckCity}
                onChangeCheckTownArea={onChangeCheckTownArea}
              />
            </div>
          </Modal.Content>
          <Modal.Actions>
            <SearchConditionWrap>
              <SearchConditionLeft>
                <SearchConditionCurrentList
                  searchConditionCurrentList={searchConditionCurrentList}
                  modal
                />
              </SearchConditionLeft>
              <SearchConditionRight>
                <MoreButtonWrap>
                  <ButtonLV1
                    primary
                    height={42}
                    heightTab={42}
                    padding="10px 10px"
                    paddingTab="10px 10px"
                    onClick={onClickMore}
                  >
                    この条件で検索する
                  </ButtonLV1>
                </MoreButtonWrap>
              </SearchConditionRight>
            </SearchConditionWrap>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

export default ButtonModalConfirm;
