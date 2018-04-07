// @flow

import React, { Fragment } from 'react';
import { H1 } from 'components/atomic/atoms/Headline';
import InlineText from 'components/atomic/atoms/InlineText';
import { Colors } from 'variables';

type PropTypes = {
  pref: string,
  city: string,
  town: string,
  name: string,
}

export default (props: PropTypes) => (
  <Fragment>
    <div>
      <InlineText.Base color={Colors.red}>
        {props.pref}&nbsp;
      </InlineText.Base>
      <InlineText.Base color={Colors.red}>
        {props.city}&nbsp;
      </InlineText.Base>
      <InlineText.Base color={Colors.red}>
        {props.town}&nbsp;
      </InlineText.Base>
    </div>
    <H1>{props.name}</H1>
  </Fragment>
);
