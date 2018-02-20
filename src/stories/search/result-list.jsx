import React from 'react';
import styled from 'styled-components';
import ResultItem from './result-item';
import { media } from '../../helpers/style/media-query';
import { Dimens } from '../../variables';

const Container = styled.div`
  text-align: center;
  &::after {
    clear: both;
    content: "";
    display: block;
  }

  ${media.phone`
    margin-top: ${Dimens.medium}px;
  `}
`;

const Cell = styled.div`
  display: inline-block;
`;

export default props => (
  <Container>
    {props.spaces.map((space, i) => (
      <Cell key={`result_list_cell_${i}`}>
        <ResultItem {...space} />
      </Cell>
    ))}
  </Container>
);
