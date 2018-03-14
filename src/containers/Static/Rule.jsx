import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Rule from 'components/Static/Rule';

class RuleContainer extends React.Component {
  render() {
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
