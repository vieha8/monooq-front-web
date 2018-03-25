import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'semantic-ui-react';
import { Dimens } from 'variables';

const Container = styled.div`
  margin-top: ${Dimens.medium}px;
`;

export default props => (
  <Container>
    <Checkbox
      checked={props.ui.space.isFurniture}
      onChange={(_, data) => props.handleChangeCheck(data.checked)}
      label="家具や家電製品に対応する"
    />
  </Container>
);
