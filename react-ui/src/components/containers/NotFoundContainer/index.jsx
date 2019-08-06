// @flow

import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ContainerStaticPage from 'components/LV1/ContainerStaticPage';
import NotFound from 'components/LV3/NotFound';
import Header from 'components/containers/Header';

class NotFoundContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <ContainerStaticPage>
          <NotFound />
        </ContainerStaticPage>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(NotFoundContainer));
