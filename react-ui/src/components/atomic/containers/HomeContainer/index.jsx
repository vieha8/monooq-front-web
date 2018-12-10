// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import HomeTemplate from 'components/atomic/templates/HomeTemplate';
import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import ServiceMenu from 'components/atomic/containers/ServiceMenuContainer';
import Header from 'components/atomic/containers/Header';
import SearchResult from 'components/atomic/LV3/SearchResult';
import { spaceActions } from 'redux/modules/space';
import connect from '../connect';
import { checkAuthState, mergeAuthProps } from '../AuthRequired';
import dummySpaceImage from 'images/dummy_space.png';
import { convertImgixUrl } from 'helpers/imgix';
import LoadingPage from 'components/atomic/LV3/LoadingPage';

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
    props.dispatch(spaceActions.fetchFeatureSpaces());
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

    const { features, isLoading } = this.props;

    if (isLoading) {
      return <LoadingPage />;
    }

    return (
      <MenuPageTemplate
        header={<Header />}
        leftContent={
          <HomeTemplate
            //TODO 無理やりSearchResult使わずにホーム用のコンポーネントつくる
            searchResult={features.map((v, i) => (
              <SearchResult
                isHome
                key={i}
                caption={v.title}
                spaces={v.spaces.map(s => ({
                  image:
                    s.Images.length !== 0
                      ? convertImgixUrl(
                          s.Images[0].ImageUrl,
                          'fit=crop&w=170&max-h=120&format=auto',
                        )
                      : dummySpaceImage,
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
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    features: state.space.features,
    isMore: state.search.isMore,
    isLoading: state.space.isLoading,
  });

export default connect(
  HomeContainer,
  mapStateToProps,
);
