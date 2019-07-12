// @flow

import React, { Fragment } from 'react';
import { Colors } from 'variables';
import InlineText from 'components/LV1/InlineText';

type PropTypes = {
  keyName: string,
  errors: Array<string>,
};

export default ({ keyName, errors }: PropTypes) => (
  <Fragment>
    {Array.isArray(errors) &&
      errors.map((e, i) => (
        <div key={`${keyName}_${i}`.toString()}>
          <InlineText.Small color={Colors.error}>{e}</InlineText.Small>
        </div>
      ))}
  </Fragment>
);
