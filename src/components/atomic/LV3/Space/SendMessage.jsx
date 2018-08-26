// @flow

import React from 'react';

import Card from 'components/atomic/LV1/Card';
import SendMessage from 'components/atomic/LV2/Space/SendMessage';

type PropTypes = {
  onClick: Function,
  loading: boolean,
  disabled: boolean,
};

export default (props: PropTypes) => (
  <Card block noBorderPhone>
    <SendMessage onClick={props.onClick} loading={props.loading} disabled={props.disabled} />
  </Card>
);
