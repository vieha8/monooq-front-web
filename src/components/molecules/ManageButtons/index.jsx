// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/atoms/Button';
import { Colors } from 'variables';

const Container = styled.div`
  width: 147px;
`;

const Wrapper = styled.div`
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

// atomsに無い特殊ボタンのため、ここで特別に定義
const PrivateButton = Button.Primary.extend`
  color: ${Colors.darkGray2};
  background: ${Colors.white};
  border: 1px solid ${Colors.lightGray1};
  &:hover {
    background: ${Colors.white};
    color: ${Colors.lightGray1};
    border: 1px solid ${Colors.lightGray2};
  }
`;

type PropTypes = {
  onClickEdit: Function,
  onClickPublic: Function,
  onClickPrivate: Function,
  private: boolean,
}

export default (props: PropTypes) => (
  <Container>
    <Wrapper>
      <Button.Primary
        small
        onClick={props.onClickEdit}  
      >
        編集する
      </Button.Primary>
    </Wrapper>
    <Wrapper>
      {props.private ? (
        <Button.Secondary
          small
          onClick={props.onClickPublic}
        >
          この場所を公開する
        </Button.Secondary>
      ) : (
        <PrivateButton
          small
          onClick={props.onClickPrivate}  
        >
          非公開にする
        </PrivateButton>
      )}
    </Wrapper>
  </Container>
);
