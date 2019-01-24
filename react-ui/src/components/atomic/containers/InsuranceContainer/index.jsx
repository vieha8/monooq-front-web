// @flow

import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import StaticPageContent from 'components/atomic/LV1/StaticPageContent';
import Insurance from 'components/atomic/LV3/Insurance';
import Header from 'components/atomic/containers/Header';

class InsuranceContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <StaticPageContent>
          <Insurance />
        </StaticPageContent>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(InsuranceContainer));
