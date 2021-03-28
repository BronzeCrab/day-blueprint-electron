import React from 'react'

export const DatePicker = ({ handleChange, dateVal }) => {
    return (
        <div>
            <input type="date" onChange={handleChange} value={dateVal} className="datepicker" />
        </div>
    )
}
