import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import Path from 'config/path';
import Rule from 'components/Static/Rule';

class RuleContainer extends React.Component {
  render() {
    const { ui, history } = this.props;
    return (
      <Fragment>
        <Rule />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(RuleContainer));
