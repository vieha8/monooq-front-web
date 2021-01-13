import React, { Fragment } from 'react';
import Meta from 'components/LV1/Meta';
import PageNotFound from 'components/LV3/PageNotFound';

const PageNotFoundPage = React.memo(() => (
  <Fragment>
    <Meta noindex />
    <PageNotFound />
  </Fragment>
));

export default PageNotFoundPage;
