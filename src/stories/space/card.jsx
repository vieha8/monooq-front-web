import React from 'react';
import Card, { CardContent } from 'material-ui/Card';

export default props => (
  <Card>
    <CardContent>
      {props.children}
    </CardContent>
  </Card>
);
