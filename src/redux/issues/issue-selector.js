const getIssues = store => store.issues;
const getUnfinishedIssue = store => getIssues(store).filter(issue => issue.status !== 'done');
const getIssueById = (store,_id) => {
    let result = null;
    for (let i = 0; i < store.issues.length; i ++) {
        if (store.issues[i].id === _id) {
            result = store.issues[i];
            break;
        }
    }
    return result;
};

export {getIssues, getUnfinishedIssue, getIssueById};