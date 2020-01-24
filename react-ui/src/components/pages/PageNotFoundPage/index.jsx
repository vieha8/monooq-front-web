import React, { Fragment } from 'react';
import PageNotFound from 'components/LV3/PageNotFound';
import Meta from 'components/LV1/Meta';

const PageNotFoundPage = React.memo(() => (
  <Fragment>
    <Meta noindex />
    <PageNotFound />
  </Fragment>
));

export default PageNotFoundPage;
