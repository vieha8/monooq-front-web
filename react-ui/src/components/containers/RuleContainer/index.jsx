// @flow

import React from 'react';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import Rule from 'components/LV3/Rule';

class RuleContainer extends React.Component {
  render() {
    return <Rule />;
  }
}

export default ContentPageStatic(RuleContainer);
