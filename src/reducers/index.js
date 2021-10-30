import { combineReducers } from 'redux';
import { calendarReducer } from './calendar';
import { uiReducer } from './ui';

const reducers = {
    calendar: calendarReducer,
    ui: uiReducer
}

export default combineReducers(reducers);