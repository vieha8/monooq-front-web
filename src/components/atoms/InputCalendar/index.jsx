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
`;

type PropTypes = {
  focused: boolean,
  date: Date,
  placeholder?: string,
  onDateChange: Function,
  onFocusChange: Function,
}

export default (props: PropTypes) => (
  <Container>
    <SingleDatePicker
      date={props.date}
      placeholder={props.placeholder || '日付を選択してください'}
      block
      onDateChange={props.onDateChange}
      focused={props.focused}
      onFocusChange={props.onFocusChange}
    />
  </Container>
);
