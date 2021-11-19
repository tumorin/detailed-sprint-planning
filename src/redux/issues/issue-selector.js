const getIssues = store => store.issues;
const getUnfinishedIssue = store => getIssues(store).filter(issue => issue.status !== 'done');

export {getIssues, getUnfinishedIssue};