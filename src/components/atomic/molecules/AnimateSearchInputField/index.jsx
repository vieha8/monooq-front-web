// @flow

import React from 'react';
import styled from 'styled-components';
import SearchIcon from 'components/atomic/molecules/HeaderAction/SearchIcon';
import AnimateInputField from 'components/atomic/atoms/AnimateInputField';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  text-align: ${props => props.align};
`;

const InputWrapper = styled.span`
  display: inline-block;
  width: 90%;
`;

const IconWrapper = styled.span`
  vertical-align: middle;
  cursor: pointer;
`;

type PropTypes = {
  iconLeft?: boolean,
  iconRight?: boolean,
  show?: boolean,
  placeholder?: string,
  iconColor: string,
  onClickIcon: Function,
  onKeyDownInputField?: Function,
  onChange?: Function,
}

function Icon(props: PropTypes) {
  return (
    <IconWrapper onClick={props.onClickIcon}>
      <SearchIcon color={props.iconColor} />
    </IconWrapper>
  );
}

function refInputField(ref, props) {
  if (ref && props.onKeyDownInputField) {
    ref.addEventListener('keydown', props.onKeyDownInputField);
  }
}

export default (props: PropTypes) => (
  <Container
    align={(props.iconLeft && 'left') || (props.iconRight && 'right')}
  >
    {props.iconLeft && Icon(props)}
    <InputWrapper>
      <AnimateInputField
        show={props.show}
        placeholder={props.placeholder}
        innerRef={ref => refInputField(ref, props)}
        onChange={e => props.onChange(e.target.value)}
      />
    </InputWrapper>
    {props.iconRight && Icon(props)}
  </Container>
);
