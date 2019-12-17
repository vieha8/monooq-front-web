import React, { Component, Fragment } from 'react';
import Header from 'components/containers/Header';
import Footer from 'components/LV2/Footer';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import { Colors } from 'variables';

export default (WrappedComponent, option) => {
  return class ContentPageMenuComponent extends Component {
    componentDidMount() {
      if (option && option.bgGray) {
        this.prevBg = document.body.style.background;
        document.body.style.background = Colors.lightGray1Bg;
      }
    }

    componentWillUnmount() {
      if (option && option.bgGray) {
        document.body.style.background = this.prevBg;
      }
    }

    render() {
      return (
        <Fragment>
          <MenuPageTemplate
            maxWidth={option && option.maxWidth ? option.maxWidth : ''}
            caption={option && option.caption ? option.caption : ''}
            header={<Header />}
            headline={option && option.headline ? option.headline : ''}
            leftContent={<WrappedComponent {...this.props} />}
            noMargin={option && option.noMargin ? option.noMargin : false}
          />
          {option && !option.noFooter && (
            <Footer
              bottomMargin={!!(option && option.bottomMargin)}
              bottomMarginOnlySP={!!(option && option.bottomMarginOnlySP)}
            />
          )}
        </Fragment>
      );
    }
  };
};
