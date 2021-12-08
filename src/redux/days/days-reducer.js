import daysActionTypes from './days-types';
import _ from 'lodash';
const INIT_STATE = [];

const daysReducer = (state=INIT_STATE,action) => {
    switch (action.type) {
        case daysActionTypes.SET_DAYS:
            return [
                ...action.payload
            ]
        case daysActionTypes.ADD_DAYS:
            // console.log('old state ->',state);
            //
            // const newState = state.map(day => {
            //     let _workWith;
            //     if (Array.isArray(day.workWith)) {
            //         _workWith = day.workWith.map((label) => label)
            //     } else _workWith = day.workWith;
            //     return ({
            //         sprintID: day.sprintID,
            //         dayNumber: day.dayNumber,
            //         issueID: day.issueID,
            //         workWith: _workWith,
            //     })
            // });
            //
            // newState.push(action.payload);
            // console.log('new state before push->',newState);
            // console.log('new state ->',newState);
            // return newState;
            return [
                ...state,
                ...action.payload
            ]
        default: return state;
    }
}

export default daysReducer;