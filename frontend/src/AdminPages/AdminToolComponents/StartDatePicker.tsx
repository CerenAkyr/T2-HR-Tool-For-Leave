import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./StartDatePicker.css";

type props = {
  handleDateChange: (date: Dayjs | null) => void
}

function DatePickerValue( {handleDateChange}: props) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2001-07-18'));

  return (
    <div className="datepicker-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <div className="datepicker-wrapper">
            <label className="datepicker-label" style={{fontWeight:"normal", color: "gray"}} >Doğum Günü</label>
            <DatePicker
              className="datepicker-input"
              label=""
              value={value}
              onChange={(newValue) => handleDateChange(newValue)}
            />
          </div>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}

export default DatePickerValue;
