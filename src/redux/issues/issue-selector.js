const getIssues = store => store.issues;
const getUnfinishedIssue = store => getIssues(store).filter(issue => issue.status !== 'done');
const getIssueById = (issues,_id) => {
    let result = null;
    for (let i = 0; i < issues.length; i ++) {
        if (issues[i].id === _id) {
            result = issues[i];
            break;
        }
    }
    return result;
};

export {getIssues, getUnfinishedIssue, getIssueById};