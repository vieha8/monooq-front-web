import React from 'react';
import { withRouter } from 'react-router';
import { Page } from '../../stories/create-space/page/Shared';
import AllUsePrice from '../../stories/create-space/page/AllUsePrice';

const AllUsePriceContainer = props => (
  <Page>
    <AllUsePrice {...props} />
  </Page>
);

export default withRouter(AllUsePriceContainer);
