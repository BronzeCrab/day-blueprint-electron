import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

export const DatePicker = ({ handleChange, dateVal }) => {

  return (
    <div className="exmp-wrp">
      <div className="btn-wrp">
        <input onChange={handleChange} value={dateVal} type="date" className="btn-clck" />
      </div>
      <FontAwesomeIcon className="calendarBtn" icon={faCalendarDay} />
    </div>
  )
}
