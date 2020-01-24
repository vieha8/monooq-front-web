import React from 'react';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import { Colors } from 'variables';

export default (WrappedComponent, option) => {
  return class ContentPageMenuComponent extends React.Component {
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
        <MenuPageTemplate
          maxWidth={option && option.maxWidth ? option.maxWidth : ''}
          caption={option && option.caption ? option.caption : ''}
          headline={option && option.headline ? option.headline : ''}
          leftContent={<WrappedComponent {...this.props} />}
          noMargin={option && option.noMargin ? option.noMargin : false}
        />
      );
    }
  };
};
