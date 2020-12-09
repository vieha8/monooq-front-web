import React from 'react';
import styled from 'styled-components';
import 'dayjs/locale/ja';
import dayjs from 'dayjs';
import { Colors } from 'variables';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'stylesheets/datepicker_overrieds.css';
import { SingleDatePicker } from 'react-dates';

dayjs.locale('ja');

const Wrap = styled.div`
  width: 100%;
  border: 1px solid ${Colors.borderGray};
  ${props =>
    props.focused &&
    `
    border: 1px solid ${Colors.brandPrimary};
  `};
`;

export default ({ focused, date, placeholder, onDateChange, onFocusChange, isAllowKeyboard }) => (
  <Wrap focused={focused}>
    <SingleDatePicker
      date={date}
      placeholder={placeholder || '荷物の搬入日を選択する'}
      block
      showDefaultInputIcon
      onDateChange={onDateChange}
      focused={focused}
      onFocusChange={onFocusChange}
      numberOfMonths={1}
      readOnly={!isAllowKeyboard}
    />
  </Wrap>
);
