// @flow

import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import HelpService from 'components/atomic/pages/Help/Service';
import Path from 'config/path';

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
  location: {
    pathname: string,
  },
}

function mapPathnameToContent(pathname: string) {
  switch (pathname) {
    case Path.helpService():
      return 'service';
    case Path.helpUserTransaction():
      return 'usertransaction';
    case Path.helpHost():
      return 'host';
    case Path.helpSpace():
      return 'space';
    case Path.helpHostTransaction():
      return 'hosttransaction';
    case Path.helpSalesTransfer():
      return 'salestransfer';
    case Path.helpSignin():
      return 'signin';
    case Path.helpOther():
      return 'other';
    default:
      return 'service';
  }
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
    const { ui, location } = this.props;

    return (
      <Fragment>
        <HelpService
          openHowToUser={ui.openHowToUser}
          onClickHowToUser={this.onClickHowToUser}
          openHowToBeHost={ui.openHowToBeHost}
          onClickHowToBeHost={this.onClickHowToBeHost}
          onClickList={this.onClickList}
          openFlagList={ui.openFlagList || []}
          onClickBack={this.onClickBack}
          content={mapPathnameToContent(location.pathname)}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(HelpTopContainer));
