// @flow

import React, { Component } from 'react';
import Header from 'components/containers/Header';
import ServiceMenu from 'components/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';

type PropTypes = {
  WrappedComponent: Component,
  option: {
    meta?: string,
    caption?: string,
    headline?: string,
    rightContent?: Component,
    noMargin?: boolean,
  },
};

const ContentPageMenu = (WrappedComponent, option): PropTypes => {
  class ContentPageStaticComponent extends Component {
    render() {
      return (
        <MenuPageTemplate
          caption={option && option.caption ? option.caption : ''}
          header={<Header />}
          headline={option && option.headline ? option.headline : ''}
          leftContent={<WrappedComponent {...this.props} />}
          rightContent={option && option.rightContent ? option.rightContent : <ServiceMenu />}
          noMargin={option && option.noMargin ? option.noMargin : false}
        />
      );
    }
  }
  return ContentPageStaticComponent;
};

export default ContentPageMenu;
