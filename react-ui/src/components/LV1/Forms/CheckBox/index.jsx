import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'semantic-ui-react';

const Wrap = styled.div`
  display: flex;
  cursor: pointer;
  vertical-align: top;
`;

export default ({ onClick, label, checked, onClickCheck, className, options }) => (
  <Wrap onClick={onClick}>
    <Checkbox
      label={label}
      checked={checked}
      onChange={onClickCheck}
      className={className}
      {...options}
    />
  </Wrap>
);
