// @flow

import React from 'react';
import styled from 'styled-components';
import { H2, H3 } from 'components/atoms/Headline';
import TextLink from 'components/atoms/TextLink';
import HelpButton from 'components/molecules/Help/HelpButton';
import { Colors } from 'variables';

const Container = styled.div`
  &:not(:first-child) {
    margin-top: 32px; 
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const ButtonWrapper = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 216px;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const HelpContainer = styled.div`
  margin-top: 12px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${Colors.borderGray};
`;

type PropTypes = {
  headline: string,
  buttons: Array<{
    title: string,
    onClick: Function,
  }>,
  helpTitle: string,
  helpLink: string,
}

export default (props: PropTypes) => {
  return (
    <Container>
      <H2>{props.headline}</H2>
      <ButtonsContainer>
        {props.buttons.map((button, i) => (
            <ButtonWrapper key={`help_button_${i}`}>
              <HelpButton {...button} />
            </ButtonWrapper>
        ))}
      </ButtonsContainer>
      <HelpContainer>
        <H3>よくある質問</H3>
        <TextLink href={props.helpLink}>{props.helpTitle}</TextLink>
      </HelpContainer>
    </Container>
  );
}
