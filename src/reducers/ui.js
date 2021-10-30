import { types } from "../types/types";

const initialState = {
    reminderModalVisible: false,
    weatherState: {
        status: null,
        icon: null,
        maxTemp: null,
        minTemp: null
    }
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.uiShowReminderModal:
            return {
                ...state,
                reminderModalVisible: action.payload
            }

        case types.uiSetWeather:
            return {
                ...state,
                weatherState: {
                    status: action.payload.status,
                    icon: action.payload.icon,
                    maxTemp: action.payload.maxTemp,
                    minTemp: action.payload.minTemp
                }
            }

        case types.uiClearWeather:
            return {
                ...state,
                weatherState: {
                    status: null,
                    icon: null,
                    maxTemp: null,
                    minTemp: null
                }
            }

        default:
            return state;
    }
}