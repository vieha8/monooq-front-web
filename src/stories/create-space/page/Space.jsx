import React from 'react';
import styled from 'styled-components';
import { ImageDrop, InputTitle, SelectType, InputIntro, InputAddress, Button } from '../index';

const Container = styled.div`
`;

export default () => (
  <Container>
    <ImageDrop />
    <InputTitle />
    <SelectType />
    <InputIntro />
    <InputAddress />
    <Button>次へ</Button>
  </Container>
);
