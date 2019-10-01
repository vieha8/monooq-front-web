// @flow

import React from 'react';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import About from 'components/LV3/About';

class AboutContainer extends React.Component {
  render() {
    return <About />;
  }
}

export default ContentPageStatic(AboutContainer, {
  maxWidth: true,
});
