import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import NotFound from 'components/Static/NotFound';

class NotFoundContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <NotFound />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(NotFoundContainer));
