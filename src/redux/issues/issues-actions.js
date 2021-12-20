import issuesActionTypes from './issue-types';

export const setIssues = (issues) => ({
    type: issuesActionTypes.SET_ISSUES,
    payload: issues
})

export const addNewIssue = (issue) => ({
    type: issuesActionTypes.ADD_NEW_ISSUE,
    payload: [issue]
})

export const deleteIssue = (issueId) => ({
    type: issuesActionTypes.DELETE_ISSUE,
    payload: issueId
})

