import { types } from "../types/types";

const initialState = {
    activeDate: new Date().getTime(),
    reminderList: [],
    visibleReminderList: [],
    visibleMonth: new Date().getMonth(),
    activeReminder: null
}

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.calendarLoadReminderList:
            return {
                ...state,
                reminderList: [...action.payload]
            }

        case types.calendarSetVisibleReminderList:
            return {
                ...state,
                visibleReminderList: state.reminderList.filter(reminder => (
                    ((reminder.date > new Date(new Date(state.activeDate).getFullYear(), new Date(state.activeDate).getMonth(), - 7).getTime())
                        && (reminder.date < new Date(new Date(state.activeDate).getFullYear(), new Date(state.activeDate).getMonth() + 1, 38).getTime()))
                ))
            }

        case types.calendarSetMonth:
            return {
                ...state,
                activeDate: new Date(new Date(state.activeDate).setDate(1)).setMonth(action.payload)
            }

        case types.calendarAddReminder:
            return {
                ...state,
                reminderList: [...state.reminderList, action.payload]
            }

        case types.calendarEditReminder:
            return {
                ...state,
                reminderList: state.reminderList.map(reminder => (reminder.id === action.payload.id)
                    ? {
                        ...reminder,
                        city: action.payload.city,
                        date: action.payload.date,
                        text: action.payload.text
                    }
                    : reminder)
            }


        case types.calendarSetActiveReminder:
            return {
                ...state,
                activeReminder: action.payload
            }

        case types.calendarDeleteReminder:
            return {
                ...state,
                reminderList: state.reminderList.filter(reminder => (reminder.id !== action.payload))
            }

        default:
            return state;
    }
}