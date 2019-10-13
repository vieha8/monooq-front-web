// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import ReactGA from 'react-ga';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import SearchConditionMore from 'components/LV3/SearchConditionMore';
import { spaceActions } from 'redux/modules/space';
import { isAvailableLocalStorage } from 'helpers/storage';
import { iskeyDownEnter } from 'helpers/keydown';
import connect from '../connect';

const AreaAroundList = () => [
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
  {
    text: '武蔵村山市',
    link: '/musashimurayama',
  },
  {
    text: '渋谷区',
    link: '/shibuya',
  },
  {
    text: '北区',
    link: '/kita',
  },
];

const TownAreaList1 = () => [
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
  {
    text: '代々木神園町',
    link: '/1111',
  },
  {
    text: '宇田川町',
    link: '/2222',
  },
  {
    text: '上原',
    link: '/333',
  },
  {
    text: '東',
    link: '/333',
  },
];

type PropTypes = {
  history: {
    push: Function,
  },
  space: {
    id: number,
  },
};

class SearchConditionMoreContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // onKeyDownButtonSearch = e => {
  //   if (iskeyDownEnter(e) && this.validate()) {
  //     this.onClickSearch();
  //   }
  // };

  onClickSearch = () => {
    // TODO: 検索処理実装
    // const { history, dispatch } = this.props;
    // dispatch(spaceActions.resetSearch());
    //
    // const { keyword, prefCode, type, receiptType } = this.state;
    // const searchPath = Path.search();
    // let query = `?keyword=${keyword}`;
    // query += `&prefCode=${prefCode}`;
    // query += `&type=${type}`;
    // query += `&isFurniture=true`;
    // query += `&receiptType=${receiptType}`;
    //
    // ReactGA.event({
    //   category: 'Search',
    //   action: 'Submit Condition Search Form',
    //   label: query,
    // });
    //
    // if (isAvailableLocalStorage()) {
    //   const params = { keyword, prefCode, type, receiptType };
    //   localStorage.setItem('searchCondition', JSON.stringify(params));
    // }
    //
    // history.push(`${searchPath}${query}`);
  };

  handleChangeUI = (propName: string, value: any) => {
    const { state } = this;
    const { error } = state;
    const errors = [];
    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate = () => {
    // 未チェックな場合は検索ボタン非活性としておく
    return true;
  };

  // TODO: 諸々このあと実装

  render() {
    // const { keyword, prefCode, type, receiptType, error } = this.state;

    return (
      <SearchConditionMore
        btnText="地域を絞り込む"
        prefecture="東京都"
        city="渋谷区,新宿区,目黒区,千代田区,文京区,港区"
        townArea="上原,恵比寿,神山町,笹塚,松濤,神宮前,神泉町,千駄ヶ谷"
        cityTownAreaList={[
          {
            cityName: '目黒区',
            areaAroundList: AreaAroundList(),
            townAreaList: TownAreaList1(),
          },
          {
            cityName: '港区',
            areaAroundList: AreaAroundList(),
            townAreaList: TownAreaList1(),
          },
        ]}
      />
    );
  }
}

export default ContentPageMenu(connect(SearchConditionMoreContainer), {});
