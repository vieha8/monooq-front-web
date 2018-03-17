// @flow

import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import AboutService from 'components/pages/Help/AboutService';

type PropTypes = {
  dispatch: Function,
  ui: {
    openHowToUser: boolean,
    openHowToBeHost: boolean,
    openFlagList: Array<boolean>,
  },
  history: {
    goBack: Function,
  },
}

class HelpTopContainer extends React.Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    const { dispatch } = props;
    dispatch(uiActions.setUiState({ openFlagList: [] }));
  }

  onClickHowToUser = () => {
    const { ui, dispatch } = this.props;
    dispatch(uiActions.setUiState({ openHowToUser: !ui.openHowToUser }));
  }

  onClickHowToBeHost = () => {
    const { ui, dispatch } = this.props;
    dispatch(uiActions.setUiState({ openHowToBeHost: !ui.openHowToBeHost }));
  }

  onClickList = (i: number) => {
    const { dispatch, ui } = this.props;
    ui.openFlagList[i] = !ui.openFlagList[i];
    dispatch(uiActions.setUiState({ openFlagList: ui.openFlagList }));
  }

  onClickBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { ui } = this.props;

    return (
      <Fragment>
        <AboutService
          openHowToUser={ui.openHowToUser}
          onClickHowToUser={this.onClickHowToUser}
          openHowToBeHost={ui.openHowToBeHost}
          onClickHowToBeHost={this.onClickHowToBeHost}
          onClickList={this.onClickList}
          openFlagList={ui.openFlagList || []}
          onClickBack={this.onClickBack}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(HelpTopContainer));
