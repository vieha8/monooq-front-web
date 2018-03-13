import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import Path from 'config/path';
import NotFound from 'components/Static/NotFound';

class NotFoundContainer extends React.Component {
  render() {
    const { ui, history } = this.props;
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
