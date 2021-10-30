import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { calendarAddReminder, calendarDeleteReminder, calendarEditReminder, calendarSetVisibleReminderList } from '../../actions/calendar';
import { uiClearWeather, uiShowReminderModal, uiStartLoadingWeather } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { Weather } from './Weather';

const initFormValues = {
    city: '',
    date: '',
    time: '',
    text: ''
}

export const ReminderModal = () => {

    const [{ city, date, time, text }, setFormField, handleInputChange] = useForm(initFormValues);

    const { activeReminder } = useSelector(state => state.calendar)
    const { visibleReminderList } = useSelector(state => state.calendar)

    useEffect(() => {
        if (!!activeReminder) {
            let { city, date, text } = visibleReminderList.find(reminder => (reminder.id === activeReminder))
            setFormField({
                city: city,
                date: moment(date).format('YYYY-MM-DD'),
                time: moment(date).format('HH:mm'),
                text: text
            })

            dispatch(uiStartLoadingWeather(city, date));
        }
    }, [activeReminder])

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!activeReminder) {
            dispatch(calendarAddReminder(city.slice(0, 189), new Date(`${date} ${time}`).getTime(), text.slice(0, 30)))
        } else {
            dispatch(calendarEditReminder(activeReminder, city.slice(0, 189), new Date(`${date} ${time}`).getTime(), text.slice(0, 30)))
        }
        dispatch(calendarSetVisibleReminderList())
        dispatch(uiClearWeather())
        dispatch(uiShowReminderModal(false))
    }

    const handleCloseModal = (e) => {
        dispatch(uiClearWeather())
        dispatch(uiShowReminderModal(false))
    }

    const handleDeleteReminder = (e) => {
        dispatch(calendarDeleteReminder(activeReminder))
        dispatch(calendarSetVisibleReminderList())
        dispatch(uiClearWeather())
        dispatch(uiShowReminderModal(false))
    }

    const handleOnBlur = (e) => {
        if (!!city && !!date) {
            dispatch(uiStartLoadingWeather(city, date))
        }
    }

    return (
        <div className="floating-window">
            <div className="floating-window-content">
                <form id="reminder-form" onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className="form-col-1">
                            <label htmlFor="city">City</label>
                            <input type="text" name="city" id="city" value={city} maxLength="189" required onChange={handleInputChange} onBlur={handleOnBlur} ></input>

                            <label htmlFor="date">Date</label>
                            <input type="date" name="date" id="date" value={date} required onChange={handleInputChange} onBlur={handleOnBlur}></input>

                            <label htmlFor="time">Time</label>
                            <input type="time" name="time" id="time" value={time} required onChange={handleInputChange}></input>
                            <label htmlFor="text">Reminder</label>
                            <input type="text" name="text" id="text" value={text} maxLength="30" required onChange={handleInputChange}></input>

                            <div>
                            </div>
                        </div>
                        <div className="form-col-2">
                            <Weather />
                        </div>
                    </div>
                    <div className="form-button-container">
                        <button className="form-button" type="submit">Accept</button>
                        <button className="form-button" type="button" onClick={handleCloseModal}>Cancel</button>
                        <button className="delete-button" type="button" onClick={handleDeleteReminder}>Delete</button>
                    </div>
                </form>

            </div>
        </div >
    )
}
