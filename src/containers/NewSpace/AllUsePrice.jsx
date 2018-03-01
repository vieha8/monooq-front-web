import React from 'react';
import { withRouter } from 'react-router';
import { Page } from 'components/NewSpace/page/Shared';
import AllUsePrice from 'components/NewSpace/page/AllUsePrice';

const AllUsePriceContainer = props => (
  <Page>
    <AllUsePrice {...props} />
  </Page>
);

export default withRouter(AllUsePriceContainer);
