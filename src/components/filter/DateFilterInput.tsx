import React, { useRef, useState } from 'react'
import styles from "../../styles/FilterInput.module.css"
import { DateTimePicker, LocalizationProvider, renderTimeViewClock } from '@mui/x-date-pickers'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import 'dayjs/locale/ko'

type DateFilterInputProps = {
  handleInput: (start: string, end: string) => void
}

export default function DateFilterInput({ handleInput }: DateFilterInputProps) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const startDateRef = useRef(null)
  const endDateRef = useRef(null)


  const validateAndHandleInput = (event: any) => {
    event.preventDefault()
    if (startDate && endDate && "$d" in startDate && "$d" in endDate) {
      const startDatePrimitive = new Date((startDate as any).$d)
      const endDatePrimitive = new Date((endDate as any).$d)

      if (startDatePrimitive.getTime() < endDatePrimitive.getTime()) {
        handleInput(formatDate(startDatePrimitive), formatDate(endDatePrimitive))
        
        // todo : find a way to reset the date input after request
      } else {
        alert("Err: End time earlier than start time.")
      }
    } else {
      alert('Err: Please select both start and end dates')
    }
  }

  // Formats date into `YYYY-MM-DD HH:mm:ss`
  const formatDate = (date: Date) => {
    const padNumber = (num: number) => {
      return num.toString().padStart(2, '0');
    }

    const year = date.getFullYear()
    const month = padNumber(date.getMonth() + 1)
    const day = padNumber(date.getDate())
    const hours = padNumber(date.getHours())
    const minutes = padNumber(date.getMinutes())
    const seconds = padNumber(date.getSeconds())
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DateTimePicker 
          className={[styles.filter_date_input, styles.filter_input].join(" ")} 
          onChange={datejs => setStartDate(datejs as any)}
          label="Start Date" 
          views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          value={startDate}
          ref={startDateRef}
        />
        <DateTimePicker 
          className={[styles.filter_date_input, styles.filter_input].join(" ")} 
          onChange={datejs => setEndDate(datejs as any)}
          label="End Date" 
          views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          value={endDate}
          ref={endDateRef}
        />
      </LocalizationProvider>


      <button className={[styles.filter_button_input, styles.filter_input].join(" ")} onClick={validateAndHandleInput}>SEARCH</button>
    </>
  );
}