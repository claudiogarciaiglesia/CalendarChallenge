import React from 'react'
import { useDispatch } from 'react-redux';
import { calendarSetActiveReminder } from '../../actions/calendar';
import { uiShowReminderModal } from '../../actions/ui';

export const Reminder = ({ id, city, date, text }) => {

    const dispatch = useDispatch();

    const handleReminderClick = (e) => {
        dispatch(calendarSetActiveReminder(id));
        dispatch(uiShowReminderModal(true));
    }

    return (
        <>
            <span onClick={handleReminderClick} className="reminder no-select" title={text}>{text}</span>
        </>
    )
}
