// @flow

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/atomic/atoms/InlineText';
import Button from 'components/atomic/atoms/Button';

const Wrapper = styled.div`
  margin-top: 8px;
`;

type PropTypes = {
  onClickSave: Function,
  disabled?: boolean,
};

export default (props: PropTypes) => (
  <div>
    <div>
      <InlineText.Base>下書き保存が可能です</InlineText.Base>
    </div>
    <Wrapper>
      <Button secondary onClick={props.onClickSave} disabled={props.disabled}>
        保存する
      </Button>
    </Wrapper>
  </div>
);
