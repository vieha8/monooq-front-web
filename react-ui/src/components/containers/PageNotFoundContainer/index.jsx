// @flow

import React from 'react';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import PageNotFound from 'components/LV3/PageNotFound';

class PageNotFoundContainer extends React.Component {
  render() {
    return <PageNotFound />;
  }
}

export default ContentPageStatic(PageNotFoundContainer);
