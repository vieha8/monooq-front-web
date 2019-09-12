// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from 'components/containers/Header';
import Footer from 'components/LV2/Footer';
import ContainerStaticPage from 'components/LV1/ContainerStaticPage';

const ContentPageStatic = (WrappedComponent: Component) => {
  class ContentPageStaticComponent extends Component {
    render() {
      return (
        <Fragment>
          <Header />
          <ContainerStaticPage>
            <WrappedComponent {...this.props} />
          </ContainerStaticPage>
          <Footer />
        </Fragment>
      );
    }
  }
  const mapStateToProps = state => ({
    ui: state.ui,
  });
  return withRouter(connect(mapStateToProps)(ContentPageStaticComponent));
};

export default ContentPageStatic;
