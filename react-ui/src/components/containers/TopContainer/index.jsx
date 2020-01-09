import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import Path from 'config/path';
import Footer from 'components/LV2/Footer';
import Top from 'components/LV3/Top';
import ReactGA from 'react-ga';
import { spaceActions } from 'redux/modules/space';
import { isAvailableLocalStorage } from 'helpers/storage';
import { iskeyDownEnter } from 'helpers/keydown';
import { sectionActions } from 'redux/modules/section';
import Intercom from 'react-intercom';

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
    dispatch(sectionActions.getRegion());
  }

  componentDidMount() {
    const { regionId } = this.props;
    this.setScrollRegion(regionId);
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    const { regionId } = this.props;
    if (regionId !== prevProps.regionId) {
      this.setScrollRegion(regionId);
      window.scrollTo(0, 0);
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
    const query = `?keyword=${keyword}`;
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
    const { ui, history, user, intercomHash } = this.props;
    const { locationText, searchButtonDisabled } = this.state;

    const isProd =
      document.domain === 'monooq.com' ||
      document.domain === 'https://monooq-front-web-staging.herokuapp.com/';

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
          sections={[]}
        />
        <Footer />
        {isProd && (
          <Intercom
            appID="v0rdx0ap"
            user_id={user.id}
            email={user.email}
            name={user.name}
            user_hash={intercomHash}
          />
        )}
      </Wrap>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  isLogin: state.auth.isLogin,
  regionId: state.section.regionId,
  user: state.auth.user,
  intercomHash: state.auth.intercom.hash,
});

export default withRouter(connect(mapStateToProps)(TopContainer));
