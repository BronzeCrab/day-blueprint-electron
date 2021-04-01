import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
const DatePicker = ({
  handleChange,
  dateVal
}) => {

  return (
    <div className="calendar-wraper">
      <div className="calendar-input-wraper">
        <input onChange={handleChange} value={dateVal} type="date" className="calendar-input" />
      </div>
      <FontAwesomeIcon className="calendar-icon" icon={faCalendarDay} />
    </div>
  )
};


// The propType is used to make sure the props types are the same as required
DatePicker.propTypes = {
  handleChange: PropTypes.func.isRequired,
  dateVal: PropTypes.string.isRequired,
};

export default DatePicker;

