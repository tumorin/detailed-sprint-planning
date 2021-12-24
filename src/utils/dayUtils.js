import {format} from "date-fns";

export function getSprintDayByNumber(sprint, dayNumber) {
    const sprintStart = new Date(sprint.start);
    const oneDay = 1000 * 3600 * 24;
    const dt = new Date(sprintStart.getTime() + oneDay * dayNumber);
    return format(dt, "LLL/dd/yyyy")
}

export function prepareAssigneedList(daysForIssue, sprint) {
    let result = [];
    const daysForIssueForSprint = daysForIssue.filter(day => day.sprintID === sprint.id);
    const allys =  new Set();
    daysForIssueForSprint.forEach(day => {
        allys.add(day.workWith);
    })
    allys.forEach(ally => {
        const daysForAlly = daysForIssueForSprint.filter(day => day.workWith === ally);
        const groupOfArr = [[daysForAlly[0]]];
        let groupNum = 0;
        for (let i = 1; i < daysForAlly.length; i++) {
            if(daysForAlly[i].dayNumber !== daysForAlly[i - 1].dayNumber + 1 ) {
                groupNum++;
            }
            if (Array.isArray(groupOfArr[groupNum])) {
                groupOfArr[groupNum].push(daysForAlly[i])
            } else groupOfArr[groupNum] = [daysForAlly[i]]
        }
        result.push(...groupOfArr.reduce((acc, group, index) => {
            acc.push({id: ally + index, ally,
                fromDate: getSprintDayByNumber(sprint, group[0].dayNumber),
                toDate: getSprintDayByNumber(sprint, group[group.length - 1].dayNumber)
            })
            return acc
        },[]))
    })
    return result;
}
