// @flow

import React from 'react';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';

const Wrapper = styled.div`
  margin-top: 8px;
`;

type PropTypes = {
  onClickSave: Function,
  disabled?: boolean,
};

export default ({ onClickSave, disabled }: PropTypes) => (
  <div>
    <div>
      <InlineText.Base>下書き保存が可能です</InlineText.Base>
    </div>
    <Wrapper>
      <Button secondary onClick={onClickSave} disabled={disabled}>
        保存する
      </Button>
    </Wrapper>
  </div>
);
