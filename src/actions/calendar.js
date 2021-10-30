import { types } from "../types/types";


export const calendarSetActiveDay = (day) => ({
    type: types.calendarSetActiveDay,
    payload: day
});

export const calendarLoadReminderList = (reminders) => ({
    type: types.calendarLoadReminderList,
    payload: reminders
});

export const calendarSetActiveReminder = (id) => ({
    type: types.calendarSetActiveReminder,
    payload: id
});

export const calendarSetVisibleReminderList = () => ({
    type: types.calendarSetVisibleReminderList
});

export const calendarSetMonth = (month) => ({
    type: types.calendarSetMonth,
    payload: month
});

export const calendarAddReminder = (city, date, text) => ({
    type: types.calendarAddReminder,
    payload: {
        id: new Date().getTime(),
        city: city,
        date: date,
        text: text
    }
});

export const calendarEditReminder = (id, city, date, text) => ({
    type: types.calendarEditReminder,
    payload: {
        id: id,
        city: city,
        date: date,
        text: text
    }
});

export const calendarDeleteReminder = (id) => ({
    type: types.calendarDeleteReminder,
    payload: id
});