import React, { Component } from 'react';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import HowToUse from 'components/LV3/HowToUse';

class HowToUseContainer extends Component<*> {
  render() {
    return <HowToUse />;
  }
}

export default ContentPageStatic(HowToUseContainer, {
  maxWidth: true,
});
