import daysActionTypes from './days-types';
const INIT_STATE = [];

const daysReducer = (state=INIT_STATE,action) => {
    switch (action.type) {
        case daysActionTypes.SET_DAYS:
            return [
                ...state,
                ...action.payload
            ]
        default: return state;
    }
}

export default daysReducer;