import React from 'react';
import styled from 'styled-components';
import SingleDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ja from 'date-fns/locale/ja';
import { Colors } from 'variables';

registerLocale('ja', ja);

const Button = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 4px;
  border: 1px solid ${Colors.borderGray};
  background-color: ${Colors.white};
`;

const CustomInput = ({ value, onClick }) => {
  return <Button onClick={onClick}>{value || '荷物の搬入日を選択する'}</Button>;
};

export default ({ date, onDateChange }) => (
  <div>
    <SingleDatePicker
      selected={date}
      onChange={onDateChange}
      dateFormat="yyyy/MM/dd"
      locale="ja"
      customInput={<CustomInput />}
    />
  </div>
);
