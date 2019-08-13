// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import Path from 'config/path';
import Top from 'components/LV3/Top';
import ReactGA from 'react-ga';
import { isAvailableLocalStorage } from 'helpers/storage';
import PickupStaffSpaceList from 'components/LV3/Top/pickup';
import { spaceActions } from 'redux/modules/space';
import { iskeyDownEnter } from 'helpers/keydown';

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
      pickUpSpaces: this.shuffleArray(PickupStaffSpaceList).slice(0, 4),
    };
  }

  shuffleArray = array => {
    const result = array;
    for (let i = array.length - 1; i > 0; i -= 1) {
      const rand = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      result[i] = array[rand];
      result[rand] = temp;
    }
    return result;
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
    const query = `?keyword=${keyword}&prefCode=0&type=0&receiptType=0&priceMin=&priceMax=&isFurniture=false`;
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
    const { ui, history, isLogin } = this.props;
    const { locationText, searchButtonDisabled, pickUpSpaces } = this.state;

    if (isLogin) {
      return <Redirect to={Path.home()} />;
    }

    return (
      <Top
        locationText={locationText}
        handleChangeLocation={this.handleChangeLocation}
        onKeyDownSearchField={this.onKeyDownSearchField}
        searchButtonDisabled={searchButtonDisabled}
        onClickSearch={() => this.search(locationText)}
        pickUpSpaces={pickUpSpaces}
        onClickSignup={() => history.push(Path.createSpaceInfo())}
        moreFeature={ui.moreFeature}
        onClickMoreFeature={() => this.viewMoreFeature()}
        onClickMoreArea={() => this.viewMoreArea()}
        moreArea={ui.moreArea}
        history={history}
      />
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  isLogin: state.auth.isLogin,
});

export default withRouter(connect(mapStateToProps)(TopContainer));
