// @flow

import React from 'react';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import CancelPolicy from 'components/LV3/CancelPolicy';

class CancelPolicyContainer extends React.Component {
  render() {
    return <CancelPolicy />;
  }
}

export default ContentPageStatic(CancelPolicyContainer);
