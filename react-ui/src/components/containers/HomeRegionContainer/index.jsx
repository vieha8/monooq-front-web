// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import Path from 'config/path';
import HomeTemplate from 'components/templates/HomeTemplate';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import Header from 'components/containers/Header';
import NoCollapsible from 'components/LV1/Collapsible/NoCollapsible';
import SearchResult from 'components/LV3/SearchResult';
import ConciergeContents from 'components/LV2/ConciergeIntroduction';
import { homeActions } from 'redux/modules/home';
import dummySpaceImage from 'images/dummy_space.png';
import { convertImgixUrl } from 'helpers/imgix';
import { iskeyDownEnter } from 'helpers/keydown';
import LoadingPage from 'components/LV3/LoadingPage';
import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

const HomeWrap = styled.div`
  ${media.tablet`
    margin: auto ${Dimens.small2_15}px;
  `};
`;

type PropTypes = {
  dispatch: Function,
  history: {
    push: Function,
  },
  match: {
    params: {
      region_id: string,
    },
  },
};

class HomeRegionContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
    const { dispatch, match } = props;
    const regionId = match.params.region_id;
    dispatch(homeActions.fetchSections({ regionId }));
  }

  onClickSpace = (space: { ID: number }) => {
    const { history } = this.props;
    history.push(Path.space(space.id));
  };

  showSections = () => {
    // TODO component化してHomeContainerと一緒にする
    const { sections, history } = this.props;

    return sections.map(({ id, displayType, title, contents }) => {
      const key = `section${id}`;

      if (displayType === 'regions') {
        return <NoCollapsible key={key} title={title} contents={contents} />;
      }

      if (displayType === 'prefecture') {
        const contentsLength = contents.length;
        contents.sort(() => Math.random() - 0.5); // 並び順をランダム化
        const isMore = contentsLength > 6;
        const showContents = contents.slice(0, 6);

        let onClickMore = () => {};
        let onKeyDownButtonMore = () => {};
        if (isMore) {
          if (displayType === 'prefecture' && contents[0].PrefectureId !== 0) {
            onClickMore = () => {
              history.push(Path.homePrefecture(contents[0].PrefectureId));
            };
            onKeyDownButtonMore = e => {
              if (iskeyDownEnter(e)) {
                onClickMore();
              }
            };
          }
        }

        return (
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
                      'fit=fillmax&fill-color=DBDBDB&w=170&h=120&auto=format',
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
        );
      }

      if (displayType === 'concierge') {
        return <ConciergeContents key={key} />;
      }

      return null;
    });
  };

  render() {
    const { isLoading } = this.props;

    return (
      <MenuPageTemplate
        header={<Header />}
        leftContent={
          isLoading ? (
            <LoadingPage />
          ) : (
            <HomeWrap>
              <HomeTemplate sections={this.showSections()} />
            </HomeWrap>
          )
        }
        rightContent={<ServiceMenu />}
        noMargin
      />
    );
  }
}

const mapStateToProps = state => ({
  sections: state.home.sections,
  isLoading: state.home.isLoading,
});

export default authRequired(connect(mapStateToProps)(HomeRegionContainer));
