import React from 'react';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import { PrimaryButton } from 'components/LV1/Forms/Button/Primary';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import { Dimens, Colors } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';

const Container = styled.div`
  margin: ${Dimens.small_10}px auto ${Dimens.medium4_50}px;
  ${media.tablet`
      max-width: 100%;
      margin: ${Dimens.xxsmall_5}px auto ${Dimens.medium1_25}px;
  `};
`;

const Wrapper = styled.div`
  &:not(:first-child) {
    margin-top: ${Dimens.small_10}px;
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

export default ({
  onClickRemove,
  onClickEdit,
  statusPrivate,
  onClickPublic,
  statusPublic,
  onClickPrivate,
}) => (
  <Container>
    <Wrapper>
      <ButtonEntry
        enabled
        relative
        remove
        backButton={{
          text: 'このスペースを削除する',
          modalTitle: 'スペース削除',
          modalText: '登録済みのスペースを削除します。よろしいですか？',
          onClick: onClickRemove,
        }}
        enabledButton={{
          text: '編集する',
          onClick: onClickEdit,
        }}
      />
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
