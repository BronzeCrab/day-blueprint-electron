import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

export const DatePicker = ({ handleChange, dateVal }) => {

  return (
    <>
      <FontAwesomeIcon icon={faCalendarDay} />
    </>
  )
}
