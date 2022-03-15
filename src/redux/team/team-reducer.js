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
        case teamActionTypes.SET_TEAM_MEMBER:
            const updatedTeamMember = action.payload;
            let oldTeamMemberIndex = state.findIndex(elem => elem.id === updatedTeamMember.id);
            if (oldTeamMemberIndex === -1) return state;
            return [
                ...state.slice(0, oldTeamMemberIndex),
                updatedTeamMember,
                ...state.slice(oldTeamMemberIndex + 1)
            ]
        default: return state;
    }
}

export default teamReducer;