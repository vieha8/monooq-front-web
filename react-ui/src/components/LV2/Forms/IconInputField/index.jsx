// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import InputField from 'components/LV1/Forms/InputField';
import TextButton from 'components/LV1/Texts/TextButton';
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

const StyledTextButton = styled(TextButton)`
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
  right?: boolean,
  iconClassName: string,
  type: string,
  placeholder: string,
  value: string | number,
  onChange: Function,
  onKeyDown: Function,
  clickIcon: Function,
};

export default ({
  right,
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  clickIcon,
  iconClassName,
}: PropTypes) => (
  <Wrapper>
    {right ? (
      <Fragment>
        <IconInputField
          right={right}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <StyledTextButton onClick={clickIcon} className={iconClassName} right={right} />
      </Fragment>
    ) : (
      <Fragment>
        <Icon className={iconClassName} />
        <IconInputField
          right={right}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </Fragment>
    )}
  </Wrapper>
);
