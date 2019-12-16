import React from 'react';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import ButtonModalConfirm from 'components/LV2/Forms/ButtonModalConfirm';

const Container = styled.div`
  margin: auto;
`;

export default ({ onClickEdit, onClickRemove }) => (
  <Container>
    <Button secondary borderbold fontbold fill={1} onClick={onClickEdit}>
      編集する
    </Button>
    <ButtonModalConfirm
      remove
      btnText="このスペースを削除する"
      modalTitle="スペース削除"
      modalText="登録済みのスペースを削除します。よろしいですか？"
      onClick={onClickRemove}
    />
  </Container>
);
