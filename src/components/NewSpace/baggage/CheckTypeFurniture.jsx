import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'semantic-ui-react';
import { Dimens } from 'variables';

const Container = styled.div`
  margin-top: ${Dimens.medium}px;
`;

export default (props) => (
  <Container>
    <Checkbox
      name="isFurniture"
      onChange={props.handleChangeCheckbox}
      label="家具や家電製品の保管に対応する"
    />
  </Container>
);