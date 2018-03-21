import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';
import { FontSizes, Colors, Dimens } from 'variables';

const Container = styled.div`
  width: 100%;
`;

const Label = styled.span`
  display: block;
  margin-bottom: ${Dimens.small2}px;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.black};
`;

const Text = Label.extend`
  display: inline-block;
  margin-left: ${Dimens.medium}px;
`;

const StyledSelect = styled(Dropdown)`
  display: inline-block;
  padding: ${Dimens.medium}px;
  border: 1px solid ${Colors.borderGray};
  border-radius: 3px;
  vertical-align: middle;
  &:not(:first-child) {
    margin-left: ${Dimens.medium}px;
  }
`;

export default props => (
  <Container>
    <Label>{props.label}</Label>
    <div>
      <StyledSelect
        value={props.month}
        options={Array(12).fill(0).map((_, i) => ({ key: i, value: (i + 1), text: (i + 1) }))}
        onChange={(_, data) => props.onChangeMonth(data.value)}
      />
      <Text>月</Text>
      <Text>/</Text>
      <StyledSelect
        value={props.year}
        options={
          Array(10)
            .fill(0)
            .map((_, i) => ({ key: i, value: moment().year() + i, text: moment().year() + i }))
        }
        onChange={(_, data) => props.onChangeYear(data.value)}
      />
      <Text>年</Text>
    </div>
  </Container>
);
