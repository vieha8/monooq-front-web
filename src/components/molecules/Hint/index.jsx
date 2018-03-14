// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atoms/InlineText';
import { Colors } from 'variables';

const Container = styled.div`
  display: table;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 30px;
  background: ${Colors.lightYellow};
`;

const TextWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Text = InlineText.Base.extend`
  display: block;
  &:not(:first-child) {
    margin-top: 24px;
  }
  text-align: left;
`;

type PropTypes = {
  title: string,
  content: Array<string>,
}

export default (props: PropTypes) => (
  <Container>
    <TextWrapper>
      <Text>{props.title}</Text>
      {props.content.map((str, i) => (
        <Text key={`hint_content_${i}`}>{str}</Text>
      ))}
    </TextWrapper>
  </Container>
);
