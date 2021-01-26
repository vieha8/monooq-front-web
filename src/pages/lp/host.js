import React from 'react';
import Lp1Host from 'components/LV3/Lp1Host';
import BaseLayout from 'components/Layout';

const title = '毎月3万円の副収入が得られる!?空きスペースに荷物を置くだけの簡単副業「モノオク」';

const Lp1HostPage = React.memo(() => (
  <BaseLayout title={title} noindex>
    <Lp1Host />
  </BaseLayout>
));

export default Lp1HostPage;
