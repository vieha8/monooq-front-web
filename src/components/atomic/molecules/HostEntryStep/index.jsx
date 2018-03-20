// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import InlineText from 'components/atomic/atoms/InlineText';

const Wrapper = styled.div`
  ${props => props.marginTop && `
    margin-top: ${props.marginTop}px;
  `}
`;

const Title = InlineText.Base.extend`
  font-size: 18px;
`;

const Step = InlineText.Base.extend`
  font-size: 14px;
  ${props => !props.pass && `
    color: ${Colors.lightGray1};
  `}
`;

type PropTypes = {
  step: number,
}

export default (props: PropTypes) => (
  <div>
    <Wrapper>
      <Title>ホストになるステップ</Title>
    </Wrapper>
    <Wrapper marginTop={12}>
      <Step pass={props.step >= 0}>1.スペース情報を登録</Step>
    </Wrapper>
    <Wrapper marginTop={8}>
      <Step pass={props.step >= 1}>2.預かる荷物について</Step>
    </Wrapper>
    <Wrapper marginTop={8}>
      <Step pass={props.step >= 2}>3.荷物の受け取りについて</Step>
    </Wrapper>
    <Wrapper marginTop={8}>
      <Step pass={props.step >= 3}>4.料金目安を設定する</Step>
    </Wrapper>
  </div>
);
