// @flow

import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import HelpTop from 'components/atomic/LV3/Help/Top';

type PropTypes = {
  ui: {
    openHowToUser: boolean,
    openHowToBeHost: boolean,
  },
};

class HelpTopContainer extends React.Component<PropTypes> {
  onClickHowToUser = () => {
    const { ui, dispatch } = this.props;
    dispatch(uiActions.setUiState({ openHowToUser: !ui.openHowToUser }));
  };

  onClickHowToBeHost = () => {
    const { ui, dispatch } = this.props;
    dispatch(uiActions.setUiState({ openHowToBeHost: !ui.openHowToBeHost }));
  };

  render() {
    const { ui } = this.props;
    return (
      <HelpTop
        openHowToUser={ui.openHowToUser}
        onClickHowToUser={this.onClickHowToUser}
        openHowToBeHost={ui.openHowToBeHost}
        onClickHowToBeHost={this.onClickHowToBeHost}
      />
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(HelpTopContainer));
