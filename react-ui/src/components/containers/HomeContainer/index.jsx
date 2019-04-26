// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import Path from 'config/path';
import HomeTemplate from 'components/templates/HomeTemplate';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import Collapsible from 'components/LV1/Collapsible';
import SearchResult from 'components/LV3/SearchResult';
import ConciergeContents from 'components/LV2/ConciergeIntroduction';
import { homeActions } from 'redux/modules/home';
import dummySpaceImage from 'images/dummy_space.png';
import bannerPickupImage from 'images/banner-pickup.png';
import { convertImgixUrl } from 'helpers/imgix';
import LoadingPage from 'components/LV3/LoadingPage';
import { checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

const HomeWrap = styled.div`
  ${media.tablet`
    margin: auto ${Dimens.medium_15}px;
  `};
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: ${Dimens.medium3_40}px;
  border-radius: ${Dimens.small}px;
  ${media.tablet`
    border-radius: unset;
  `};
  ${media.phone`
    margin-bottom: ${Dimens.medium_20}px;
  `};
`;

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
};

class HomeContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
    props.dispatch(homeActions.fetchSections());
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickSpace = (space: { ID: number }) => {
    const { history } = this.props;
    history.push(Path.space(space.ID));
  };

  showSections = () => {
    const { sections } = this.props;

    return sections.map(({ id, displayType, title, contents }) => {
      const key = `section${id}`;

      if (displayType === 'pickup_banner') {
        return <Image key={key} src={bannerPickupImage} alt="banner-pickup" />;
      }

      if (displayType === 'regions') {
        return <Collapsible key={key} title={title} contents={contents} />;
      }

      if (displayType === 'concierge') {
        return <ConciergeContents key={key} />;
      }

      if (displayType === 'features' || displayType === 'region') {
        return (
          <SearchResult
            isHome
            key={key}
            caption={title}
            spaces={contents.map(({ Space }) => ({
              id: Space.ID,
              image:
                Space.Images.length !== 0
                  ? convertImgixUrl(
                      Space.Images[0].ImageUrl,
                      'fit=fillmax&fill-color=DBDBDB&w=170&h=120&format=auto',
                    )
                  : dummySpaceImage,
              title: Space.Title,
              address: `${Space.AddressPref}${Space.AddressCity}`,
              isFurniture: Space.IsFurniture,
              priceFull: Space.PriceFull,
              priceHalf: Space.PriceHalf,
              priceQuarter: Space.PriceQuarter,
            }))}
          />
        );
      }

      return null;
    });
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { isLoading } = this.props;

    return (
      <MenuPageTemplate
        header={<Header />}
        leftContent={
          isLoading ? (
            <LoadingPage />
          ) : (
            <Fragment>
              <HomeWrap>
                <HomeTemplate sections={this.showSections()} />
              </HomeWrap>
            </Fragment>
          )
        }
        rightContent={<ServiceMenu />}
        noMargin
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    sections: state.home.sections,
    isLoading: state.home.isLoading,
  });

export default connect(
  HomeContainer,
  mapStateToProps,
);
