// @flow

import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ContainerStaticPage from 'components/LV1/ContainerStaticPage';
import Insurance from 'components/LV3/Insurance';
import Header from 'components/containers/Header';

class InsuranceContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <ContainerStaticPage>
          <Insurance />
        </ContainerStaticPage>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(InsuranceContainer));
