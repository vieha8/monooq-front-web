import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import { isMobileWindow } from '../../helpers/style/media-query';
import { Dimens } from '../../variables';

const cardStyle = {
  padding: `${isMobileWindow() ? 0 : Dimens.medium2}px`,
};

export default props => (
  <Card style={{ ...cardStyle, ...props }}>
    <CardContent>
      {props.children}
    </CardContent>
  </Card>
);
