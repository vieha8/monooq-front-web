import React from 'react';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';

const Container = styled.div`
  background: ${Colors.yellow};
  padding: ${Dimens.large}px 0;
`;

export default (props) => {
  const {
    step,
    registerEmail,
    authTelForm,
    inputPinForm,
    confirmedForm,
    profileForm,
    registeredForm,
  } = props;

  const forms = [
    registerEmail,
    authTelForm,
    inputPinForm,
    confirmedForm,
    profileForm,
    registeredForm,
  ];
  const form = forms[step];

  return (
    <Container>
      {form}
    </Container>
  );
};
