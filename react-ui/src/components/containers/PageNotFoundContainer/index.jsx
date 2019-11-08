import React, { Fragment } from 'react';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import PageNotFound from 'components/LV3/PageNotFound';
import Meta from 'components/LV1/Meta';

class PageNotFoundContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Meta noindex />
        <PageNotFound />
      </Fragment>
    );
  }
}

export default ContentPageStatic(PageNotFoundContainer);
