const getDays = store => store.days;

const getDaysBySprintId = (store, sprint) => {
    if (!sprint) return [];
    return getDays(store).filter(day => day.sprintID === sprint.id);
}

const getDaysByIssueId = (store, issueId) => {
    if (!issueId || !store) return [];
    return getDays(store).filter(day => day.issueID === issueId)
}

export {getDaysBySprintId, getDaysByIssueId};