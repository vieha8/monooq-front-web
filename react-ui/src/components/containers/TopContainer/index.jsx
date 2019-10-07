// @flow

import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import Path from 'config/path';
import Footer from 'components/LV2/Footer';
import Top from 'components/LV3/Top';
import ReactGA from 'react-ga';
import { isAvailableLocalStorage } from 'helpers/storage';
import { spaceActions } from 'redux/modules/space';
import { sectionActions } from 'redux/modules/section';
import { iskeyDownEnter } from 'helpers/keydown';

const Wrap = styled.div``;

class TopContainer extends React.Component {
  constructor(props) {
    super(props);

    const { referrer } = document;
    if (isAvailableLocalStorage()) {
      if (!localStorage.getItem('referrer')) {
        localStorage.setItem('referrer', referrer);
      }
    }

    this.state = {
      locationText: '',
      searchButtonDisabled: true,
    };

    const { dispatch } = this.props;
    dispatch(sectionActions.fetchSections());
  }

  componentDidMount() {
    const { regionId } = this.props;
    this.setScrollRegion(regionId);
  }

  componentDidUpdate(prevProps) {
    const { regionId } = this.props;
    if (regionId !== prevProps.regionId) {
      this.setScrollRegion(regionId);
    }
  }

  setScrollRegion = regionId => {
    const id = `space_search_area_${regionId}`;
    if (document.getElementById(id)) {
      const target = document.getElementById(id);
      target.scrollIntoView({
        inline: 'center',
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  handleChangeLocation = event => {
    if (event.target.value === '') {
      this.setState({
        searchButtonDisabled: true,
        locationText: '',
      });
    } else {
      this.setState({
        searchButtonDisabled: false,
        locationText: event.target.value,
      });
    }
  };

  onKeyDownSearchField = e => {
    if (iskeyDownEnter(e) && e.target.value) {
      this.search(e.target.value);
    }
  };

  search = keyword => {
    const { dispatch, history } = this.props;

    dispatch(spaceActions.resetSearch());
    const query = `?keyword=${keyword}&prefCode=0&type=0&receiptType=0&priceMin=&priceMax=&isFurniture=true`;
    const path = `${Path.search()}${query}`;

    ReactGA.event({
      category: 'Search',
      action: 'Submit Top Search Form',
      label: query,
    });

    history.push(path);
  };

  viewMoreFeature = () => {
    const { dispatch } = this.props;
    dispatch(
      uiActions.setUiState({
        moreFeature: true,
      }),
    );
  };

  viewMoreArea = () => {
    const { dispatch } = this.props;
    dispatch(
      uiActions.setUiState({
        moreArea: true,
      }),
    );
  };

  render() {
    const { ui, history, sections } = this.props;
    const { locationText, searchButtonDisabled } = this.state;
    return (
      <Wrap>
        <Top
          locationText={locationText}
          handleChangeLocation={this.handleChangeLocation}
          onKeyDownSearchField={this.onKeyDownSearchField}
          searchButtonDisabled={searchButtonDisabled}
          onClickSearch={() => this.search(locationText)}
          moreFeature={ui.moreFeature}
          onClickMoreFeature={() => this.viewMoreFeature()}
          onClickMoreArea={() => this.viewMoreArea()}
          moreArea={ui.moreArea}
          history={history}
          sections={sections}
        />
        <Footer />
      </Wrap>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  isLogin: state.auth.isLogin,
  sections: state.section.sections,
  regionId: state.section.regionId,
});

export default withRouter(connect(mapStateToProps)(TopContainer));
