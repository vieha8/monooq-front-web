import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import Collapsible from 'react-collapsible';

const Wrap = styled.div`
  text-align: center;
`;

const Row = styled.ul`
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const Item = styled.li`
  margin: ${Dimens.small2}px auto 0;
`;

const Answer = styled.div`
  padding: ${Dimens.small_10}px ${Dimens.medium1}px;
  text-align: left;
  ${media.phone`
    padding: ${Dimens.small_10}px ${Dimens.medium}px;
  `}
`;

export default ({ list }) => (
  <Wrap>
    <Row>
      {list.map((item, i) => (
        <Item key={i.toString()}>
          <Collapsible trigger={item.trigger}>
            <Answer>{item.answer}</Answer>
          </Collapsible>
        </Item>
      ))}
    </Row>
  </Wrap>
);
