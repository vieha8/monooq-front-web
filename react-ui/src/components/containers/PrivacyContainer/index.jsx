// @flow

import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ContainerStaticPage from 'components/LV1/ContainerStaticPage';
import Privacy from 'components/LV3/Privacy';
import Header from 'components/containers/Header';

class PrivacyContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <ContainerStaticPage>
          <Privacy />
        </ContainerStaticPage>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(PrivacyContainer));
