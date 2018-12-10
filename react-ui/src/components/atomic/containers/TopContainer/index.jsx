import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import Path from 'config/path';
import Top from 'components/Top';
import ReactGA from 'react-ga';
import { searchActions } from '../../../../redux/modules/search';

class TopContainer extends React.Component {
  constructor(props) {
    super(props);

    const { referrer } = document;
    const referrerCache = localStorage.getItem('referrer');
    if (!referrerCache) {
      localStorage.setItem('referrer', referrer);
    }

    this.state = {
      locationText: '',
      searchButtonDisabled: true,
    };
  }

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
    if (e && e.keyCode === 13 && e.target.value) {
      this.search(e.target.value);
    }
  };

  search = keyword => {
    this.props.dispatch(searchActions.resetSearch());
    const query = `?keyword=${keyword}&prefCode=0&type=0&receiptType=0&priceMin=&priceMax=&isFurniture=false`;
    const path = `${Path.search()}${query}`;

    ReactGA.event({
      category: 'Search',
      action: 'Submit Top Search Form',
      label: query,
    });

    this.props.history.push(path);
  };

  viewMoreFeature = () => {
    this.props.dispatch(
      uiActions.setUiState({
        moreFeature: true,
      }),
    );
  };

  viewMoreArea = () => {
    this.props.dispatch(
      uiActions.setUiState({
        moreArea: true,
      }),
    );
  };

  render() {
    const { ui, history, isLogin } = this.props;
    const { locationText, searchButtonDisabled } = this.state;

    if (isLogin) {
      return <Redirect to={Path.home()} />;
    }

    return (
      <Top
        locationText={locationText}
        searchButtonDisabled={searchButtonDisabled}
        handleChangeLocation={this.handleChangeLocation}
        onClickSearch={() => this.search(locationText)}
        onClickSignup={() => history.push(Path.createSpaceInfo())}
        onKeyDownSearchField={this.onKeyDownSearchField}
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
