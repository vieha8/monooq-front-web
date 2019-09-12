// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import Path from 'config/path';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import HomeTemplate from 'components/templates/HomeTemplate';
import Collapsible from 'components/LV1/Collapsible';
import SearchResult from 'components/LV3/SearchResult';
import { homeActions } from 'redux/modules/home';
import dummySpaceImage from 'images/dummy_space.png';
import { convertImgixUrl } from 'helpers/imgix';
import { iskeyDownEnter } from 'helpers/keydown';
import LoadingPage from 'components/LV3/LoadingPage';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

const HomeWrap = styled.div`
  display: inline-block;
  ${media.tablet`
    margin: auto;
  `};
`;

const HomeContentWrap = styled.div`
  ${media.tablet`
    margin: auto ${Dimens.small2_15}px;
  `};
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: ${Dimens.medium3_40}px;
  border-radius: ${Dimens.small}px;
  ${media.tablet`
    border-radius: unset;
    margin-bottom: 0px;
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

  showSections = () => {
    const { sections, history } = this.props;

    return sections.map(({ id, displayType, title, contents, regionId }) => {
      const key = `section${id}`;

      if (displayType === 'pickup_banner') {
        const url =
          'https://monooq.imgix.net/img%2Fservice%2Fbanner-pickup.png?alt=media&token=0ca4dd4e-3fcb-4975-84cf-e4a54bf614cf&auto=format&w=540';
        return <Image key={key} src={url} alt="banner-pickup" />;
      }

      if (displayType === 'regions') {
        return (
          <HomeContentWrap key={key}>
            <Collapsible key={key} title={title} contents={contents} />
          </HomeContentWrap>
        );
      }

      if (displayType === 'features' || displayType === 'region') {
        const contentsLength = contents.length;
        const isMore = contentsLength > 6;
        contents.sort(() => Math.random() - 0.5); // 並び順をランダム化
        const showContents = contents.slice(0, 6);

        let onClickMore = () => {};
        let onKeyDownButtonMore = () => {};
        if (isMore) {
          if (displayType === 'region' && regionId !== 0) {
            onClickMore = () => {
              history.push(Path.homeRegion(regionId));
            };
            onKeyDownButtonMore = e => {
              if (iskeyDownEnter(e)) {
                onClickMore();
              }
            };
          }
        }

        return (
          <HomeContentWrap key={key}>
            <SearchResult
              isHome
              key={key}
              caption={title}
              spaces={showContents.map(({ Space }) => ({
                id: Space.ID,
                image:
                  Space.Images.length !== 0
                    ? convertImgixUrl(
                        Space.Images[0].ImageUrl,
                        'fit=fillmax&fill-color=DBDBDB&w=340&h=240&auto=format',
                      )
                    : dummySpaceImage,
                title: Space.Title,
                address: `${Space.AddressPref}${Space.AddressCity}`,
                isFurniture: Space.IsFurniture,
                priceFull: Space.PriceFull,
                priceHalf: Space.PriceHalf,
                priceQuarter: Space.PriceQuarter,
              }))}
              isMore={isMore}
              onClickMore={onClickMore}
              onKeyDownButtonMore={onKeyDownButtonMore}
            />
          </HomeContentWrap>
        );
      }

      return null;
    });
  };

  render() {
    const { isLoading } = this.props;
    return isLoading ? (
      <LoadingPage />
    ) : (
      <HomeWrap>
        <HomeTemplate sections={this.showSections()} margin="0px" />
      </HomeWrap>
    );
  }
}

const mapStateToProps = state => ({
  sections: state.home.sections,
  isLoading: state.home.isLoading,
});

export default authRequired(
  ContentPageMenu(connect(mapStateToProps)(HomeContainer), {
    noMargin: true,
  }),
);
