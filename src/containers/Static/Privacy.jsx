import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Privacy from 'components/Static/Privacy';

class PrivacyContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Privacy />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(PrivacyContainer));
