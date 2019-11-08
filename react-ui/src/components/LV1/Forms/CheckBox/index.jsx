import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'semantic-ui-react';

const Container = styled.div`
  display: flex;
  cursor: pointer;
  vertical-align: top;
`;

export default ({ onClick, label, checked, onClickCheck, className, options }) => (
  <Container onClick={onClick}>
    <Checkbox
      label={label}
      checked={checked}
      onChange={onClickCheck}
      className={className}
      {...options}
    />
  </Container>
);
