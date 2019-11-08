import React from 'react';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import Asct from 'components/LV3/Asct';

class AsctContainer extends React.Component {
  render() {
    return <Asct />;
  }
}

export default ContentPageStatic(AsctContainer);
