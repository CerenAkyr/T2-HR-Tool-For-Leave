import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./StartDatePicker.css";


interface DatePickerValueProps {
  onChange: (selectedStartDate: Dayjs | null) => void; 
}

function DatePickerValue(props: DatePickerValueProps) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2023-08-01'));

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    props.onChange(newValue); 
  };

  return (
    <div className="datepicker-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <div className="datepicker-wrapper">
            <label className="datepicker-label"  style={{color: 'gray', fontWeight: 'normal'}}>Başlama Tarihi Seçiniz</label>
            <DatePicker
              className="datepicker-input"
              label=""
              value={value}
              onChange={handleChange}
            />
          </div>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}

export default DatePickerValue;
