import issuesActionTypes from './issue-types';
const INIT_STATE = [];

const issuesReducer = (state=INIT_STATE,action) => {
    switch (action.type) {
        case issuesActionTypes.SET_ISSUES:
            return [
                ...action.payload
            ]
        case issuesActionTypes.ADD_NEW_ISSUE:
            return [
                ...state,
                ...action.payload
            ]
        case issuesActionTypes.DELETE_ISSUE:
            return state.filter(issue => issue.id !== action.payload)
        default: return state;
    }
}

export default issuesReducer;