import React from 'react'
import { useSelector } from 'react-redux';
import { Reminder } from './Reminder';

export const DayBox = ({ date, numberColor = '#000000' }) => {

    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    const { visibleReminderList } = useSelector(state => state.calendar);

    const style = {
        color: numberColor
    }

    // Filter reminders of current day
    const todayReminderList = visibleReminderList.filter(reminder =>
        ((reminder.date >= new Date(date).getTime()) && (reminder.date < new Date(year, month, day + 1).getTime()))
    )

    return (
        <div className={`day-box ${((day === new Date().getDate()) && (month === new Date().getMonth())) && 'current-day'}`} >
            <div className={`day-number-header ${((day === new Date().getDate()) && (month === new Date().getMonth())) && 'current-day'}`}>
                <div style={style} className="day-number no-select">
                    {day}
                </div>
            </div>
            <Reminder />
            {
                todayReminderList.map((reminder, index) => (
                    <Reminder
                        key={reminder.id}
                        {...reminder}
                    />
                ))
            }
        </div >
    )
}
