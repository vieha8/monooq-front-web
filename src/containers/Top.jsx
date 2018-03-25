import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import Path from 'config/path';
import Top from 'components/Top';
import Intercom from 'components/Shared/Intercom';

class TopContainer extends React.Component {
  constructor(props) {
    super(props);

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

  onKeyDownSearchField = (e) => {
    if (e && e.keyCode === 13 && e.target.value) {
      this.search(e.target.value);
    }
  }

  search = (location) => {
    window.location.href = `${Path.search()}?location=${location}`;
  }

  render() {
    const { ui, history } = this.props;
    return (
      <Fragment>
        <Top
          locationText={ui.locationText}
          searchButtonDisabled={ui.searchButtonDisabled}
          handleChangeLocation={this.handleChangeLocation}
          onClickSignup={() => history.push(Path.createSpaceInfo())}
          onKeyDownSearchField={this.onKeyDownSearchField}
          history={history}
        />
        <Intercom />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(TopContainer));
