import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import { Dimens } from '../../variables';

const cardStyle = {
  padding: `${Dimens.medium2}px`,
};

export default props => (
  <Card style={{ ...cardStyle, ...props }}>
    <CardContent>
      {props.children}
    </CardContent>
  </Card>
);
