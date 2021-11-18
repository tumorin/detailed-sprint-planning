import sprintsActionTypes from './sprints-types';

export const setSprints = (sprints) => ({
    type: sprintsActionTypes.ADD_NEW_SPRINT,
    payload: sprints
})

export const addNewSprint = (sprint) => ({
    type: sprintsActionTypes.ADD_NEW_SPRINT,
    payload: sprint
})