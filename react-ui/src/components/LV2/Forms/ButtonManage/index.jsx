import React from 'react';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import { PrimaryButton } from 'components/LV1/Forms/Button/Primary';
import { Colors } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';

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
  &:active {
    background: ${Colors.white};
    color: ${Colors.lightGray1};
    border: 1px solid ${Colors.lightGray2};
  }

  ${mediaMin.tablet`
    &:hover {
      background: ${Colors.white};
      color: ${Colors.lightGray1};
      border: 1px solid ${Colors.lightGray2};
    }
  `};
`;

export default ({ onClickEdit, statusPrivate, onClickPublic, statusPublic, onClickPrivate }) => (
  <Container>
    <Wrapper>
      <Button primary fontbold fill={1} onClick={onClickEdit}>
        編集する
      </Button>
    </Wrapper>
    <Wrapper>
      {statusPrivate && (
        <Button secondary fontbold fill={1} onClick={onClickPublic}>
          この場所を公開する
        </Button>
      )}
      {statusPublic && (
        <PrivateButton fill={1} onClick={onClickPrivate}>
          非公開にする
        </PrivateButton>
      )}
    </Wrapper>
  </Container>
);
