import React, { forwardRef } from 'react';
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

const CustomInput = forwardRef(({ value, onClick }, ref) => {
  return (
    <Button onClick={onClick} ref={ref}>
      {value || '荷物の搬入日を選択する'}
    </Button>
  );
});

export default ({ date, onDateChange, ref }) => (
  <div>
    <SingleDatePicker
      selected={date}
      onChange={onDateChange}
      dateFormat="yyyy/MM/dd"
      locale="ja"
      customInput={<CustomInput />}
      ref={ref}
    />
  </div>
);
