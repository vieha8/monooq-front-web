// @flow

import React from 'react';
import InlineText from 'components/atomic/atoms/InlineText';
import { Colors } from 'variables';
import Attribute from './Attribute';

type PropTypes = {
  content: string,
}

export default (props: PropTypes) => (
  <Attribute
    title="このスペースに置ける荷物"
    content={
      <div>
        {props.furniture &&
          <div>
            <InlineText.Bold color={Colors.brandPrimary}>
              家具・家電OK
            </InlineText.Bold>
          </div>
        }
        <InlineText.Base>{props.content}</InlineText.Base>
      </div>
    }
  />
);
