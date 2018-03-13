// @flow

import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Colors } from 'variables';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'stylesheets/datepicker_overrieds.css';
import { SingleDatePicker } from 'react-dates';

moment.locale('ja');

const Container = styled.div`
  width: 100%;
  border: 1px solid ${Colors.borderGray};
  ${props => props.focused && `
    border: 1px solid ${Colors.brandPrimary};
  `}
`;

type PropTypes = {
  focused: boolean,
  date: Date,
  placeholder?: string,
  onDateChange: Function,
  onFocusChange: Function,
}

export default (props: PropTypes) => (
  <Container focused={props.focused}>
    <SingleDatePicker
      date={props.date}
      placeholder={props.placeholder || '日付を選択してください'}
      block
      showDefaultInputIcon
      onDateChange={props.onDateChange}
      focused={props.focused}
      onFocusChange={props.onFocusChange}
    />
  </Container>
);
