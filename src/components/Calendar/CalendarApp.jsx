import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calendarLoadReminderList, calendarSetActiveReminder, calendarSetMonth, calendarSetVisibleReminderList } from '../../actions/calendar';
import { uiShowReminderModal } from '../../actions/ui';
import { reminders } from '../../mocks/reminders';

import './calendar.css';

import { DayBox } from './DayBox';
import { DayNameRow } from './DayNameRow';
import { ReminderModal } from './ReminderModal';


function CalendarApp(props) {

  const { reminderModalVisible } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const { activeDate } = useSelector(state => state.calendar);
  // const day = new Date(activeDate).getDate();
  const month = new Date(activeDate).getMonth();
  const year = new Date(activeDate).getFullYear();

  // Calculate the position of the first and last day of the month
  const firstDayPosition = new Date(year, month, 1).getDay();
  const lastDayCurrentMonth = new Date(year, month + 1, 0).getDate();

  useEffect(() => {
    dispatch(calendarLoadReminderList(reminders))
  }, [dispatch])

  useEffect(() => {
    dispatch(calendarSetVisibleReminderList())
  }, [month])


  // Populate daysArray with 35 days from previous, current and next month
  let daysArray = [];
  for (let i = 1 - firstDayPosition; i < 35 - firstDayPosition + 1; i++) {
    daysArray.push(i);
  }

  const handleAddReminder = (e) => {
    dispatch(calendarSetActiveReminder(null))
    dispatch(uiShowReminderModal(true))
  }

  const handleNextMonth = (e) => {
    dispatch(calendarSetMonth(month + 1))
  }

  const handlePreviousMonth = (e) => {
    dispatch(calendarSetMonth(month - 1))
  }

  return (
    <div className="container">
      <div className="month-title">
        <button onClick={handlePreviousMonth}>{'<'} </button> <h1>{moment(`${year}-${month + 1}-01`, 'YYYY-M-D').format('MMMM')} {year}</h1><button onClick={handleNextMonth}> {'>'}</button>
      </div>
      {!!reminderModalVisible && <ReminderModal />}
      <DayNameRow />

      <div className="day-box-wrapper">
        {
          daysArray.map((day, index) => (
            // Calculates if a specific day belongs to current month
            ((index >= firstDayPosition) && ((index - firstDayPosition) < lastDayCurrentMonth))
              ? (index % 7 === 0 || (index + 1) % 7 === 0) // Calculates if a specific day belongs to the weekend
                ?
                < DayBox
                  key={index}
                  date={new Date(year, month, day)}
                  numberColor={'#4c7daa'}
                />
                : < DayBox
                  key={index}
                  date={new Date(year, month, day)}
                  numberColor={'#000000'}
                />
              : <DayBox
                key={index}
                date={new Date(year, month, day)}
                numberColor={'#b4b4b4'}
              />
          ))
        }
      </div>
      <div className="add-reminder-btn-container">
        <button
          className="add-reminder-btn"
          onClick={handleAddReminder}
        >
          <span>+</span>
        </button>
      </div>
    </div>
  )
}

export default CalendarApp;