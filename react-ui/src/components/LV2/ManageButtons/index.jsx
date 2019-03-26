// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/LV1/Button';
import { PrimaryButton } from 'components/LV1/Button/Primary';
import { Colors } from 'variables';
import { media } from 'helpers/style/media-query';

const Container = styled.div`
  max-width: 240px;
  margin: 20px auto auto;
  ${media.tablet`
      max-width: 100%;
      margin: 10px auto auto;
  `};
`;

const Wrapper = styled.div`
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const PrivateButton = styled(PrimaryButton)`
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
  onClickPrivate?: Function,
  onClickPublic?: Function,
  private?: boolean,
  public?: boolean,
};

export default (props: PropTypes) => (
  <Container>
    <Wrapper>
      <Button primary fontbold fill={1} onClick={props.onClickEdit}>
        編集する
      </Button>
    </Wrapper>
    <Wrapper>
      {props.private && (
        <Button secondary fontbold fill={1} onClick={props.onClickPublic}>
          この場所を公開する
        </Button>
      )}
      {props.public && (
        <PrivateButton fill={1} onClick={props.onClickPrivate}>
          非公開にする
        </PrivateButton>
      )}
    </Wrapper>
  </Container>
);
