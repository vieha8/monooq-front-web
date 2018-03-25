import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens } from 'variables';
import ResultItem from './ResultItem';

const Container = styled.div`
  max-width: 790px;
  margin: 0 auto;
  ${media.phone`
    max-width: 345px;
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
        <ResultItem {...space} history={props.history} />
      </Cell>
    ))}
  </Container>
);
