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
  prefucture?: string,
  city?: string,
  townArea?: string,
};

class ButtonModalConfirm extends Component<PropTypes> {
  state = { open: false };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    const { btnText, cityTownAreaList, prefecture, city, townArea } = this.props;
    const { open } = this.state;

    const getPrefectureList = () => {
      return [
        {
          region: '北海道・東北',
          prefectureList: [
            { name: '北海道', id: 1 },
            { name: '青森', id: 2 },
            { name: '岩手', id: 3 },
            { name: '宮城', id: 4 },
            { name: '秋田', id: 5 },
            { name: '山形', id: 6 },
            { name: '福島', id: 7 },
          ],
        },
        {
          region: '関東',
          prefectureList: [
            { name: '東京', id: 13 },
            { name: '神奈川', id: 14 },
            { name: '埼玉', id: 11 },
            { name: '千葉', id: 12 },
            { name: '茨城', id: 8 },
            { name: '群馬', id: 10 },
            { name: '栃木', id: 9 },
          ],
        },
        {
          region: '甲信越・北陸',
          prefectureList: [
            { name: '山梨', id: 19 },
            { name: '新潟', id: 15 },
            { name: '長野', id: 20 },
            { name: '富山', id: 16 },
            { name: '石川', id: 17 },
            { name: '福井', id: 18 },
          ],
        },
        {
          region: '東海',
          prefectureList: [
            { name: '愛知', id: 23 },
            { name: '岐阜', id: 21 },
            { name: '静岡', id: 22 },
            { name: '三重', id: 24 },
          ],
        },
        {
          region: '関西',
          prefectureList: [
            { name: '大阪', id: 27 },
            { name: '兵庫', id: 28 },
            { name: '京都', id: 26 },
            { name: '滋賀', id: 25 },
            { name: '奈良', id: 29 },
            { name: '和歌山', id: 30 },
          ],
        },
        {
          region: '四国',
          prefectureList: [
            { name: '徳島', id: 36 },
            { name: '香川', id: 37 },
            { name: '愛媛', id: 38 },
            { name: '高知', id: 39 },
          ],
        },
        {
          region: '中国',
          prefectureList: [
            { name: '鳥取', id: 31 },
            { name: '島根', id: 32 },
            { name: '岡山', id: 33 },
            { name: '広島', id: 34 },
            { name: '山口', id: 35 },
          ],
        },
        {
          region: '九州・沖縄',
          prefectureList: [
            { name: '福岡', id: 40 },
            { name: '佐賀', id: 41 },
            { name: '長崎', id: 42 },
            { name: '熊本', id: 43 },
            { name: '大分', id: 44 },
            { name: '宮崎', id: 45 },
            { name: '鹿児島', id: 46 },
            { name: '沖縄', id: 47 },
          ],
        },
      ];
    };

    return (
      <Fragment>
        <ButtonLV1 secondary borderbold fontbold fill={1} onClick={this.open}>
          {btnText}
        </ButtonLV1>
        <Modal size="large" open={open} onClose={this.close}>
          <Modal.Content scrolling>
            <div>
              <PrefectureList list={getPrefectureList()} />
            </div>
            <div>
              <CityTownAreaList cityTownAreaList={cityTownAreaList} prefecture={prefecture} />
            </div>
          </Modal.Content>
          <Modal.Actions>
            <SearchConditionWrap>
              <SearchConditionLeft>
                <SearchConditionCurrentList
                  SearchConditionCurrentList={[
                    {
                      title: '都道府県',
                      value: prefecture,
                    },
                    {
                      title: '市区町村',
                      value: city,
                    },
                    {
                      title: '町域・エリア',
                      value: townArea,
                    },
                  ]}
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
                    // TODO: あとで実装
                    // onClick={onClickMore}
                    // onKeyDown={onKeyDownButtonMore}
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
