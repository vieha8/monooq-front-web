import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from 'components/pages/Header';
import Footer from 'components/LV2/Footer';
import PageStatic from 'components/LV1/PageStatic';

const ContentPageStatic = (WrappedComponent, option) => {
  class ContentPageStaticComponent extends Component {
    render() {
      return (
        <Fragment>
          <Header />
          <PageStatic maxWidth={option && option.maxWidth ? option.maxWidth : ''}>
            <WrappedComponent {...this.props} />
          </PageStatic>
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
