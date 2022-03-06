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
        case sprintsActionTypes.SET_SPRINT:
            const updatedSprint = action.payload;
            let oldSprintIndex = state.findIndex(elem => elem.id === updatedSprint.id);
            if (oldSprintIndex === -1) return state;
            return [
                ...state.slice(0, oldSprintIndex),
                updatedSprint,
                ...state.slice(oldSprintIndex + 1)
            ]

        default: return state;
    }
}

export default sprintsReducer;