import teamActionTypes from './team-types';
const INIT_STATE = [];

const teamReducer = (state=INIT_STATE,action) => {
    switch (action.type) {
        case teamActionTypes.SET_TEAM:
            return [
                ...state,
                ...action.payload
            ]
        case teamActionTypes.ADD_NEW_TEAM_MEMBER:
            return [
                ...state,
                ...action.payload
            ]
        default: return state;
    }
}

export default teamReducer;