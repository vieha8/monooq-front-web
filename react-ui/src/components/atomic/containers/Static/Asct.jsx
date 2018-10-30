import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import StaticPageContent from 'components/atomic/LV1/StaticPageContent';
import Asct from 'components/Static/Asct';
import Header from 'components/atomic/containers/Header';

class AsctContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <StaticPageContent>
          <Asct />
        </StaticPageContent>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(AsctContainer));
