import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./FinishDatePicker.css";
import { light } from '@mui/material/styles/createPalette';
import { lightGreen } from '@mui/material/colors';

interface DatePickerFinishValueProps {
  onChange: (selectedEndDate: Dayjs | null) => void; // Handler to pass selected start date to parent component
}

function DatePickerFinishValue(props: DatePickerFinishValueProps) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2023-08-01'));

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    props.onChange(newValue); // Pass the selected start date to parent component
  };

  return (
    <div className="datepicker-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <div className="datepicker-wrapper">
            <label className="datepicker-label" style={{color: 'gray', fontWeight: 'normal'}} >Bitiş Tarihi Seçiniz</label>
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

export default DatePickerFinishValue;
