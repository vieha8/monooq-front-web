// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/InlineText';
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

const Text = styled(InlineText.Base)`
  display: block;
  &:not(:first-child) {
    margin-top: 24px;
  }
  text-align: left;
`;

type PropTypes = {
  title: string,
  content: Array<string>,
};

export default ({ title, content }: PropTypes) => (
  <Container>
    <TextWrapper>
      <Text>{title}</Text>
      {content.map((str, i) => (
        <Text key={`hint_content_${i}`.toString()}>{str}</Text>
      ))}
    </TextWrapper>
  </Container>
);
