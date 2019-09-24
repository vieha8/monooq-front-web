// @flow

import React, { Component, Fragment } from 'react';
import Header from 'components/containers/Header';
import Footer from 'components/LV2/Footer';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';

type PropTypes = {
  WrappedComponent: Component,
  option: {
    meta?: string,
    caption?: string,
    headline?: string,
    noMargin?: boolean,
    noFooter?: boolean,
    bottomMargin?: boolean,
  },
};

export default (WrappedComponent, option): PropTypes => {
  return class ContentPageStaticComponent extends Component {
    render() {
      return (
        <Fragment>
          <MenuPageTemplate
            caption={option && option.caption ? option.caption : ''}
            header={<Header />}
            headline={option && option.headline ? option.headline : ''}
            leftContent={<WrappedComponent {...this.props} />}
            noMargin={option && option.noMargin ? option.noMargin : false}
          />
          {option && !option.noFooter && (
            <Footer bottomMargin={!!(option && option.bottomMargin)} />
          )}
        </Fragment>
      );
    }
  };
};
