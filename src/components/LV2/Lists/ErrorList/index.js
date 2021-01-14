import React, { Fragment } from 'react';
import { Colors } from 'variables';
import InlineText from 'components/LV1/Texts/InlineText';

export default ({ keyName, errors }) => (
  <Fragment>
    {errors &&
      Array.isArray(errors) &&
      errors.map((e, i) => (
        <div key={`${keyName}_${i}`.toString()}>
          <InlineText.Small color={Colors.error}>{e}</InlineText.Small>
        </div>
      ))}
  </Fragment>
);
