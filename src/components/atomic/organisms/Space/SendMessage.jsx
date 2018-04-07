// @flow

import React from 'react';

import Card from 'components/atomic/atoms/Card';
import SendMessage from 'components/atomic/molecules/Space/SendMessage';

type PropTypes = {
  onClick: Function,
  loading: boolean,
  disabled: boolean,
};

export default (props: PropTypes) => (
  <Card block>
    <SendMessage
      onClick={props.onClick}
      loading={props.loading}
      disabled={props.disabled}
    />
  </Card>
);
