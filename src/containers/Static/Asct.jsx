import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Asct from 'components/Static/Asct';

class AsctContainer extends React.Component {
  render() {
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
