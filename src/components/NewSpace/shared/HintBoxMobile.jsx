import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';

const Container = styled.div`
  @keyframes show {
    0% {
      display: block;
      opacity: 0;
    }
    100% {
      display: block;
      opacity: 1;
    }
  }
  @keyframes hide {
    0% {
      display: block;
      opacity: 1;
    }
    99% {
      display: block;
      opacity: 0;
    }
    100% {
      display: none;
      opacity: 0;
    }
  }

  display: none;
  ${media.phone`
    ${props => (props.show ? `
        display: block;
        animation show 1s ease 0s;
        animation-fill-mode: forwards;
      ` : `
        display: none;
        animation hide 1s ease 0s;
        animation-fill-mode: forwards;
      `)}
  `}
`;

const Screen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${Colors.white};
  opacity: 0.4;
  z-index: ${ZIndexes.child};
`;

const Box = styled.div`
  position: fixed;
  top: 50%;
  left: 10%;
  right: 10%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
  transform: translate(0, -50%);
  background-color: ${Colors.lightYellow};
  padding: ${Dimens.medium2}px;
  z-index: ${ZIndexes.modal};
`;

const Title = styled.span`
  display: block;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium1}px;
`;

const Text = styled.span`
  display: block;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.small}px;
  margin-top: ${Dimens.medium}px;
  line-height: 2;
`;

export default class HintBoxMobile extends Component {
  componentWillReceiveProps(nextProps) {
    if (document && document.body && document.body.style) {
      if (nextProps.show) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }

  render() {
    const { show, title, text, onClickOutside } = this.props;
    return (
      <Container show={show}>
        <Screen onClick={onClickOutside} />
        <Box>
          <Title>{title}</Title>
          <Text>{text}</Text>
        </Box>
      </Container>
    );
  }
}
