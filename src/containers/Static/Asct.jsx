import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import Path from 'config/path';
import Asct from 'components/Static/Asct';

class AsctContainer extends React.Component {
  render() {
    const { ui, history } = this.props;
    return (
      <Fragment>
        <Asct />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(AsctContainer));
