import React from 'react';
import styled from 'styled-components';
import Card, { CardContent } from 'material-ui/Card';
import { Dimens } from '../../variables';

export default props => (
  <Card>
    <CardContent>
      {props.children}
    </CardContent>
  </Card>
);
