import React from 'react';
import styled from 'styled-components';
import FlagIcon from 'material-ui-icons/Flag';
import { media } from 'helpers/style/media-query';
import { FontSizes, Colors, Dimens } from 'variables';
import Path from 'config/path';

const Container = styled.div`
  text-align: center;
  
  ${media.phone`
    padding-bottom: 40px;
  `}
`;

const IconWrapper = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

const Text = styled.a`
  display: inline-block;
  vertical-align: middle;
  font-size: ${FontSizes.small}px;
  color: ${Colors.darkGray2};
  margin-left: ${Dimens.small}px;
  text-decoration: none;
  cursor: pointer;
`;

export default () => (
  <Container>
    <IconWrapper>
      <FlagIcon style={{ color: Colors.darkGray2 }} />
    </IconWrapper>
    <Text href={Path.report()}>不適切な内容を報告</Text>
  </Container>
);
