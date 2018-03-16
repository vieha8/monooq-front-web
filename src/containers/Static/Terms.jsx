import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Terms from 'components/Static/Terms';

class TermsContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Terms />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(TermsContainer));
