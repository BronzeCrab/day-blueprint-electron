import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

export const DatePicker = ({ handleChange, dateVal }) => {

  return (
    <div className="calendar-wraper">
      <div className="calendar-input-wraper">
        <input onChange={handleChange} value={dateVal} type="date" className="calendar-input" />
      </div>
      <FontAwesomeIcon className="calendar-icon" icon={faCalendarDay} />
    </div>
  )
}
