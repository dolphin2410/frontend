import React, { useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

function DateTimeRangeInput({ onDateTimeSubmit }: { onDateTimeSubmit: ({ startDate, endDate, setImgF }: { startDate: string, endDate: string, setImgF: any }) => void }) {
  const [startDate, setStartDate] = useState<any | null>(null);
  const [endDate, setEndDate] = useState<any | null>(null);
  const [img, setImg] = useState<string>("")

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (startDate && endDate) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      alert(`Start Date/Time: ${formattedStartDate}`);
      alert(`End Date/Time: ${formattedEndDate}`);

      onDateTimeSubmit({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        setImgF: setImg
      });
    } else {
      alert('Please select both start and end dates/times.');
    }
  };

  const formatDate = (date: any) => {
    const year = date.year();
    const month = padNumber(date.month() + 1);
    const day = padNumber(date.date());
    const hours = padNumber(date.hours());
    const minutes = padNumber(date.minutes());
    const seconds = padNumber(date.seconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const padNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Start Date/Time:</label>
        <Datetime
          value={startDate}
          onChange={handleStartDateChange}
          dateFormat="YYYY-MM-DD"
          timeFormat="HH:mm:ss"
        />
      </div>
      <div>
        <label>End Date/Time:</label>
        <Datetime
          value={endDate}
          onChange={handleEndDateChange}
          dateFormat="YYYY-MM-DD"
          timeFormat="HH:mm:ss"
        />
      </div>
      <div>
        <img src={img} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default DateTimeRangeInput;
