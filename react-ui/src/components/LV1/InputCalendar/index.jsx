// @flow

import React from 'react';
import styled from 'styled-components';
import 'moment/locale/ja';
import moment from 'moment';
import { Colors } from 'variables';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'stylesheets/datepicker_overrieds.css';
import SingleDatePicker from 'react-dates/lib/components/SingleDatePicker';

moment.locale('ja');

const Container = styled.div`
  width: 100%;
  border: 1px solid ${Colors.borderGray};
  ${props =>
    props.focused &&
    `
    border: 1px solid ${Colors.brandPrimary};
  `};
`;

type PropTypes = {
  focused: boolean,
  date: Date,
  placeholder?: string,
  onDateChange: Function,
  onFocusChange: Function,
};

export default ({ focused, date, placeholder, onDateChange, onFocusChange }: PropTypes) => (
  <Container focused={focused}>
    <SingleDatePicker
      date={date}
      placeholder={placeholder || '日付を選択してください'}
      block
      showDefaultInputIcon
      onDateChange={onDateChange}
      focused={focused}
      onFocusChange={onFocusChange}
      numberOfMonths={1}
    />
  </Container>
);
