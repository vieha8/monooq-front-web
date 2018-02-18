import React from 'react';
import styled from 'styled-components';
import FlagIcon from 'material-ui-icons/Flag';
import { FontSizes, Colors, Dimens } from '../../variables';

const Container = styled.div`
  text-align: center;
`;

const IconWrapper = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

const Text = styled.a`
  display: inline-block;
  vertical-align: middle;
  font-size: ${FontSizes.small}px;
  color: ${Colors.gray};
  margin-left: ${Dimens.small}px;
  text-decoration: none;
  cursor: pointer;
`;

export default props => (
  <Container>
    <IconWrapper>
      <FlagIcon style={{ color: Colors.gray }}/>
    </IconWrapper>
    <Text href="/">不適切な内容を報告</Text>
  </Container>
);
