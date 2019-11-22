import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from 'components/containers/Header';
import Footer from 'components/LV2/Footer';
import ContainerStaticPage from 'components/LV1/ContainerStaticPage';

const ContentPageStatic = (WrappedComponent, option) => {
  class ContentPageStaticComponent extends Component {
    render() {
      return (
        <Fragment>
          <Header />
          <ContainerStaticPage maxWidth={option && option.maxWidth ? option.maxWidth : ''}>
            <WrappedComponent {...this.props} />
          </ContainerStaticPage>
          <Footer bottomMargin={!!(option && option.bottomMargin)} />
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
