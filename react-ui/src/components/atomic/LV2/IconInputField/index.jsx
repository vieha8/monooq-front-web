// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import TextButton from 'components/atomic/LV1/TextButton';
import InputField from 'components/atomic/LV1/InputField';
import { Colors } from 'variables';

const Wrapper = styled.div`
  position: relative;
`;

const Icon = styled.i`
  position: absolute;
  top: 50%;
  left: 15px;
  margin-top: -10px;
  font-size: 22px;
  color: ${Colors.lightGray1};
  ${props =>
    props.right &&
    `
      left: auto;
      right: 25px;
    `};
`;

const IconInputField = styled(InputField)`
  padding: 18px 25px 18px 46px;
  ${props =>
    props.right &&
    `
    padding: 11px 60px 11px 15px;
    `};
`;

type PropTypes = {
  iconClassName: string,
  clickIcon?: Function,
};

export default (props: PropTypes) => (
  <Wrapper>
    {props.right ? (
      <Fragment>
        <IconInputField {...props} right={props.right} />
        <TextButton onClick={props.clickIcon}>
          <Icon className={props.iconClassName} right={props.right} />
        </TextButton>
      </Fragment>
    ) : (
      <Fragment>
        <Icon className={props.iconClassName} />
        <IconInputField {...props} />
      </Fragment>
    )}
  </Wrapper>
);
