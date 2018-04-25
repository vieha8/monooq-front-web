// @flow

import React from 'react';
import styled from 'styled-components';
import InputField from 'components/atomic/LV1/InputField';
import { Colors } from 'variables';

const Wrapper = styled.div`
  position: relative;
`;

const Icon = styled.i`
  position: absolute;
  top: 50%;
  left: 14px;
  margin-top: -10px;
  font-size: 20px;
  color: ${Colors.lightGray1};
`;

const IconInputField = InputField.extend`
  padding: 12px 25px;
  padding-left: 46px;
`;

type PropTypes = {
  iconClassName: string,
};

export default (props: PropTypes) => (
  <Wrapper>
    <Icon className={props.iconClassName} />
    <IconInputField {...props} />
  </Wrapper>
);
