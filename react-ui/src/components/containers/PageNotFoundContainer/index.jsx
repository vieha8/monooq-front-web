import React from 'react';
import BaseTemplate from 'components/templates/BaseTemplate';
import PageNotFound from 'components/LV3/PageNotFound';
import Meta from 'components/LV1/Meta';

const PageNotFoundContainer = React.memo(() => (
  <BaseTemplate>
    <Meta noindex />
    <PageNotFound />
  </BaseTemplate>
));

export default PageNotFoundContainer;
