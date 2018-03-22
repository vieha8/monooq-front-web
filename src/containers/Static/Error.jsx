import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Error from 'components/Static/Error';

class ErrorContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Error {...this.props} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.api.error
});

export default withRouter(connect(mapStateToProps)(ErrorContainer));
