import React from 'react';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import "../AdminPages.css";

const CalendarForLeave: React.FC = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <div>
      <Calendar onPanelChange={onPanelChange} className='calendar__holder'/>
    </div>
  );
};

export default CalendarForLeave;