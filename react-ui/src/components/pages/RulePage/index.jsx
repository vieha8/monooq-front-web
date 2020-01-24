import React from 'react';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import Rule from 'components/LV3/Rule';

class RulePage extends React.Component {
  render() {
    return <Rule />;
  }
}

export default ContentPageStatic(RulePage);
