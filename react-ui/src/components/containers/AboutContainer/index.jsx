// @flow

import React from 'react';
import Path from 'config/path';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import About from 'components/LV3/About';

class AboutContainer extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <About
        onClickHowToUse={() => history.push(Path.howtouse())}
        onClickInsurance={() => history.push(Path.insurance())}
        onClickRule={() => history.push(Path.rule())}
      />
    );
  }
}

export default ContentPageStatic(AboutContainer, {
  maxWidth: true,
});
