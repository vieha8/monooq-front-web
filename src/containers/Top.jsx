import React from 'react';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import Top from 'components/Top';

class TopContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(
      uiActions.setUiState({
        locationText: '',
        searchButtonDisabled: false,
      }),
    );
  }

  handleChangeLocation = (event) => {
    if (event.target.value === '') {
      this.props.dispatch(
        uiActions.setUiState({
          searchButtonDisabled: false,
          locationText: '',
        }),
      );
    } else {
      this.props.dispatch(
        uiActions.setUiState({
          searchButtonDisabled: true,
          locationText: event.target.value,
        }),
      );
    }
  };

  render() {
    const { ui } = this.props;
    return (
      <Top
        locationText={ui.locationText}
        searchButtonDisabled={ui.searchButtonDisabled}
        handleChangeLocation={this.handleChangeLocation}
      />
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(TopContainer);
