import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'semantic-ui-react';
import { FontSizes } from 'variables';

const Wrap = styled.div`
  display: flex;
  cursor: pointer;
  vertical-align: top;
  ${props =>
    props.fontSize &&
    `
    font-size: ${props.fontSize}px;
  `};
`;

export default ({ onClick, fontSize, label, checked, onClickCheck, className, options }) => (
  <Wrap onClick={onClick} fontSize={fontSize}>
    <Checkbox
      label={label}
      checked={checked}
      onChange={onClickCheck}
      className={className}
      {...options}
    />
  </Wrap>
);
