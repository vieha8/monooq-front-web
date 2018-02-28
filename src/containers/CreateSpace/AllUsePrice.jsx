import React from 'react';
import { withRouter } from 'react-router';
import { Page } from 'components/create-space/page/Shared';
import AllUsePrice from 'components/create-space/page/AllUsePrice';

const AllUsePriceContainer = props => (
  <Page>
    <AllUsePrice {...props} />
  </Page>
);

export default withRouter(AllUsePriceContainer);
