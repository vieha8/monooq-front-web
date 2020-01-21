import React from 'react';
import BaseTemplate from 'components/templates/BaseTemplate';
import CancelPolicy from 'components/LV3/CancelPolicy';

const CancelPolicyContainer = React.memo(() => (
  <BaseTemplate>
    <CancelPolicy />
  </BaseTemplate>
));

export default CancelPolicyContainer;
