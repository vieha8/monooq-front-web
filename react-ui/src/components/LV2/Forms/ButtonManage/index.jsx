import React from 'react';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import ButtonModalConfirmRemove from 'components/LV2/Forms/ButtonModalConfirmRemove';

const Container = styled.div`
  margin: auto;
`;

export default ({ onClickEdit, onClickRemove }) => (
  <Container>
    <Button secondary borderbold fontbold fill={1} onClick={onClickEdit}>
      編集する
    </Button>
    <ButtonModalConfirmRemove onClick={onClickRemove} />
  </Container>
);
