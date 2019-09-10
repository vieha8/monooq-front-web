// @flow

import React, { Component } from 'react';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import HowToUse from 'components/LV3/HowToUse';
import connect from '../connect';

class HowToUseContainer extends Component<*> {
  render() {
    return <HowToUse />;
  }
}

export default ContentPageMenu(connect(HowToUseContainer), {
  headline: 'ご利用ガイド・よくある質問',
});
