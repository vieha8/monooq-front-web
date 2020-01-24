import React from 'react';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';

export default (WrappedComponent, option) => {
  return class ContentPageMenu extends React.Component {
    render() {
      return (
        <MenuPageTemplate
          maxWidth={option && option.maxWidth ? option.maxWidth : ''}
          caption={option && option.caption ? option.caption : ''}
          headline={option && option.headline ? option.headline : ''}
          noMargin={option && option.noMargin ? option.noMargin : false}
        >
          <WrappedComponent {...this.props} />
        </MenuPageTemplate>
      );
    }
  };
};
