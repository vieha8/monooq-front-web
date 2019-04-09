// @flow

import React from 'react';
import styled from 'styled-components';
import { Colors } from 'variables';
import InlineText from 'components/LV1/InlineText';

const Wrapper = styled.div`
  ${props =>
    props.marginTop &&
    `
      margin-top: ${props.marginTop}px;
    `};
`;

const Title = styled(InlineText.Base)`
  font-size: 18px;
`;

const Step = styled(InlineText.Base)`
  font-size: 14px;
  ${props =>
    !props.pass &&
    `
      color: ${Colors.lightGray1};
    `};
`;

type PropTypes = {
  edit?: boolean,
  step: number,
};

export default (props: PropTypes) => (
  <div>
    <Wrapper>
      <Title>{`${props.edit ? '編集' : '登録'}の流れ`}</Title>
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
