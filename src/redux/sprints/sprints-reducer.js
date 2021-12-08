import sprintsActionTypes from './sprints-types';
const INIT_STATE = [];

const sprintsReducer = (state=INIT_STATE,action) => {
    switch (action.type) {
        case sprintsActionTypes.SET_SPRINTS:
            return [
                ...state,
                ...action.payload
            ]
        case sprintsActionTypes.ADD_NEW_SPRINT:
            return [
                ...state,
                ...action.payload
            ]
        default: return state;
    }
}

export default sprintsReducer;