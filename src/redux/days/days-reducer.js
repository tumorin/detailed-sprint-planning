import daysActionTypes from './days-types';
const INIT_STATE = [];

const daysReducer = (state=INIT_STATE,action) => {
    switch (action.type) {
        case daysActionTypes.SET_DAYS:
            return [
                ...action.payload
            ]
        case daysActionTypes.ADD_DAYS:
            return [
                ...state,
                ...action.payload
            ]
        case daysActionTypes.DELETE_DAYS_BY_ISSUE_ID:
            return state.filter(day => day.issueID !== action.payload)
        default: return state;
    }
}

export default daysReducer;