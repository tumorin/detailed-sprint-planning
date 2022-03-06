import sprintsActionTypes from './sprints-types';

export const setSprints = (sprints) => ({
    type: sprintsActionTypes.SET_SPRINTS,
    payload: sprints
})

export const addNewSprint = (sprint) => ({
    type: sprintsActionTypes.ADD_NEW_SPRINT,
    payload: sprint
})

export const setSprint = (sprint) => ({
    type: sprintsActionTypes.SET_SPRINT,
    payload: sprint
})
