import React, { Fragment } from 'react';
import ContentPayment from 'components/LV2/Texts/ContentPayment';
import PlaceListHorizonItem from 'components/LV2/Items/PlaceListHorizonItem';

export default props => (
  <Fragment>
    <PlaceListHorizonItem {...props.space} {...props} />
    <ContentPayment {...props.payment} />
  </Fragment>
);
