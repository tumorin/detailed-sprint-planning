import teamActionTypes from './team-types';

export const setTeam = (team) => ({
    type: teamActionTypes.SET_TEAM,
    payload: team
})

export const addNewTeamMember = (teamMember) => ({
    type: teamActionTypes.ADD_NEW_TEAM_MEMBER,
    payload: teamMember
})

