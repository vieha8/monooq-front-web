// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/atomic/atoms/Button';
import { PrimaryButton } from 'components/atomic/atoms/Button/Primary';
import { Colors } from 'variables';

const Container = styled.div`
  width: 120px;
`;

const Wrapper = styled.div`
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

// atomsに無い特殊ボタンのため、ここで特別に定義
const PrivateButton = PrimaryButton.extend`
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
  onClickPrivate?: Function,
  onClickPublic?: Function,
  onClickRemove?: Function,
  private?: boolean,
  public?: boolean,
  removable?: boolean,
};

export default (props: PropTypes) => (
  <Container>
    <Wrapper>
      <Button primary small onClick={props.onClickEdit}>
        編集する
      </Button>
    </Wrapper>
    <Wrapper>
      {props.private && (
        <Button secondary small onClick={props.onClickPublic}>
          この場所を公開する
        </Button>
      )}
      {props.public && (
        <PrivateButton small onClick={props.onClickPrivate}>
          非公開にする
        </PrivateButton>
      )}
      {props.removable && (
        <PrivateButton small onClick={props.onClickRemove}>
          削除する
        </PrivateButton>
      )}
    </Wrapper>
  </Container>
);
