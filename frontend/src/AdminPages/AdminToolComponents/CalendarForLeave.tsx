import React from 'react';
import { Badge, Calendar } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import type { BadgeProps } from 'antd';
import "./Calendar.css";

const CalendarForLeave: React.FC = () => {

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'Ceren' },
          { type: 'success', content: 'Selin' },
        ];
        break;
      case 9:
        listData = [
          { type: 'warning', content: 'Ceren' },
          { type: 'success', content: 'Selin' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'Ceren' },
          { type: 'success', content: 'Selin' },
          { type: 'error', content: 'Tan' },
        ];
        break;
      default:
    }
    return listData || [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };


  // according to the role, fetch only user's leave or all leaves:
  const role = sessionStorage.getItem('role');
  //if (role === 'ROLE_ADMIN') {
    // fetch all leaves
  //} else {
    // fetch only user's leaves
    
    
  //}

  return (
    <div>
      <Calendar onPanelChange={onPanelChange} className='calendar__holder' cellRender={cellRender}/>
    </div>
  );
};

export default CalendarForLeave;