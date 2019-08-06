// @flow

import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ContainerStaticPage from 'components/LV1/ContainerStaticPage';
import Asct from 'components/LV3/Asct';
import Header from 'components/containers/Header';

class AsctContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <ContainerStaticPage>
          <Asct />
        </ContainerStaticPage>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(AsctContainer));
