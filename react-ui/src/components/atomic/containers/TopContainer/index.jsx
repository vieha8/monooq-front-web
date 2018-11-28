import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import Path from 'config/path';
import Top from 'components/Top';

class TopContainer extends React.Component {
  constructor(props) {
    super(props);

    const { referrer } = document;
    const referrerCache = localStorage.getItem('referrer');
    if (!referrerCache) {
      localStorage.setItem('referrer', referrer);
    }

    this.props.dispatch(
      uiActions.setUiState({
        locationText: '',
        searchButtonDisabled: true,
      }),
    );
  }

  handleChangeLocation = event => {
    if (event.target.value === '') {
      this.props.dispatch(
        uiActions.setUiState({
          searchButtonDisabled: true,
          locationText: '',
        }),
      );
    } else {
      this.props.dispatch(
        uiActions.setUiState({
          searchButtonDisabled: false,
          locationText: event.target.value,
        }),
      );
    }
  };

  onKeyDownSearchField = e => {
    if (e && e.keyCode === 13 && e.target.value) {
      this.search(e.target.value);
    }
  };

  search = keyword => {
    // TODO hrefじゃなくてhistoryのプッシュにする
    window.location.href = `${Path.search()}?keyword=${keyword}&prefCode=0&type=0&receiptType=0&priceMin=&priceMax=&isFurniture=false`;
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
    const { ui, history } = this.props;
    return (
      <Fragment>
        <Top
          locationText={ui.locationText}
          searchButtonDisabled={ui.searchButtonDisabled}
          handleChangeLocation={this.handleChangeLocation}
          onClickSearch={() => this.search(ui.locationText)}
          onClickSignup={() => history.push(Path.createSpaceInfo())}
          onKeyDownSearchField={this.onKeyDownSearchField}
          moreFeature={ui.moreFeature}
          onClickMoreFeature={() => this.viewMoreFeature()}
          onClickMoreArea={() => this.viewMoreArea()}
          moreArea={ui.moreArea}
          history={history}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(TopContainer));
