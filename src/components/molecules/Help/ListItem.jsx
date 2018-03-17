// @flow

import React from 'react';
import styled from 'styled-components';
import TextButton from 'components/atoms/TextButton';
import InlineText from 'components/atoms/InlineText';
import { CircleRight, CircleDown } from 'components/atoms/ActionIcon';
import { Colors } from 'variables';

const Container = styled.div`
  border-bottom: 1px solid ${Colors.borderGray};
  padding: 16px 0;
`;

const ButtonContainer = styled.div`
  display: table;
  width: 100%;
  cursor: pointer;
`;

const Cell = styled.div`
  display: table-cell;
  ${props => props.right && `
    margin-left: auto;
    text-align: right;
  `}
`;

const ContentContainer = styled.div`
  margin-top: 20px;
`;

type PropTypes = {
  title: string,
  content: string,
  onClick: Function,
  open?: boolean,
  circleDown?: boolean,
  circleRight?: boolean,
}

export default (props: PropTypes) => (
  <Container>
    <ButtonContainer onClick={props.onClick}>
      <Cell>
        <TextButton fontSize={16}>{props.title}</TextButton>
      </Cell>
      <Cell right>
          {props.circleDown && <CircleDown fontSize={12} color={Colors.linkBlue} />}
          {props.circleRight && <CircleRight fontSize={12} color={Colors.linkBlue} />}
      </Cell>
    </ButtonContainer>
    {props.open &&
      <ContentContainer>
        <InlineText.Base fontSize={14}>{props.content}</InlineText.Base>
      </ContentContainer>
    }
  </Container>
)
