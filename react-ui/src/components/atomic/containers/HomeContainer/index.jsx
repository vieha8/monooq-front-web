// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { parse } from 'helpers/query-string';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from 'components/atomic/LV1/Loading';
import Path from 'config/path';

import SearchResultTemplate from 'components/atomic/templates/SearchResult';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import SearchResult from 'components/atomic/LV3/SearchResult';
import { Dimens } from 'variables';

import { searchActions } from 'redux/modules/search';

import connect from '../connect';
import { checkAuthState, mergeAuthProps } from '../AuthRequired';

const Loader = styled(Loading)`
  margin: ${Dimens.medium2}px auto auto;
  text-align: center;
`;

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
  location: {
    search: string,
  },
  isSearching: boolean,
  spaces: Array<{
    ID: number,
    Images: Array<{
      ImageUrl: string,
    }>,
    AddressTown: string,
    Title: string,
    IsFurniture: boolean,
    PriceFull: number,
    PriceHalf: number,
    PriceQuarter: number,
  }>,
};

type State = {
  location: string,
};

class HomeContainer extends Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      features: [
        {
          id: 1,
          title: '東京都内のおすすめスペース',
        },
        {
          id: 2,
          title: '引越しに便利!大容量スペース',
        },
        {
          id: 3,
          title: 'こんなところも?ちょっとユニークなスペース',
        },
        {
          id: 4,
          title: 'モノオクスペースは全国各地に!',
        },
      ],
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickSpace = (space: { ID: number }) => {
    const { history } = this.props;
    history.push(Path.space(space.ID));
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { spaces, isMore } = this.props;

    // TODO: サンプルデータ。実装後削除するようお願いいたします。
    const sampleData = {
      ID: 1,
      Title: 'aaa',
      Address: '東京都世田谷区南烏山1-15-15 ロイヤルフラッツ芦花101',
      AddressPref: '東京都',
      AddressCity: '世田谷区',
      AddressTown: '南烏山',
      IsFurniture: false,
      PriceFull: 10000,
      PriceHalf: 0,
      PriceQuarter: 0,
      Images: [
        {
          ImageUrl:
            'https://monooq-dev.imgix.net/img%2Fspaces%2F1%2F1543319846556.jpg?alt=media&token=e075c2df-0795-4796-ae72-9cc123b4ef1d&fit=crop&w=540&max-h=300&format=auto',
        },
      ],
    };
    let sampleDataList = [];
    for (let i = 0; i < 6; i++) {
      sampleDataList.push(sampleData);
    }
    // TODO: サンプルデータここまで

    return (
      <MenuPageTemplate
        header={<Header />}
        leftContent={
          <Fragment>
            <SearchResultTemplate
              searchResult={this.state.features.map(v => (
                <SearchResult
                  // TODO: 取得するスペーズに併せて加工する。
                  // TODO: もっとみるボタンの遷移先を渡すようにしたほうがいいかも。
                  caption={v.title}
                  spaces={sampleDataList.map(s => ({
                    image: (s.Images[0] || {}).ImageUrl,
                    title: s.Title,
                    address: `${s.AddressPref}${s.AddressCity}`,
                    isFurniture: s.IsFurniture,
                    priceFull: s.PriceFull,
                    priceHalf: s.PriceHalf,
                    priceQuarter: s.PriceQuarter,
                    onClick: () => this.onClickSpace(s),
                  }))}
                />
              ))}
              noTopMargin
            />
          </Fragment>
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    spaces: state.search.spaces,
    isSearching: state.search.isLoading,
    isMore: state.search.isMore,
  });

export default connect(
  HomeContainer,
  mapStateToProps,
);
