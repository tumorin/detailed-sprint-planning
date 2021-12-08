import daysActionTypes from './days-types';

export const setDays = (days) => ({
    type: daysActionTypes.SET_DAYS,
    payload: days
})

export const addDays = (days) => ({
    type: daysActionTypes.ADD_DAYS,
    payload: days
})


