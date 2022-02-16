import {format} from "date-fns";

export function getSprintDayByNumber(sprint, dayNumber) {
    const sprintStart = new Date(sprint.start);
    const oneDay = 1000 * 3600 * 24;
    const dt = new Date(sprintStart.getTime() + oneDay * dayNumber);
    return format(dt, "LLL/dd/yyyy")
}

export function getSprintDayByNumberISO(sprint, dayNumber) {
    const sprintStart = new Date(sprint.start);
    const oneDay = 1000 * 3600 * 24;
    const dt = new Date(sprintStart.getTime() + oneDay * dayNumber);
    return format(dt, "yyyy-MM-dd")
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

export function prepareDayList(issues, sprint, days) {
    const sprintStart = new Date(sprint.start);
    const sprintEnd = new Date(sprint.end);
    const oneDay = 1000 * 3600 * 24;
    const sprintDuration = Math.round((sprintEnd - sprintStart) / oneDay);
    const dayList = [];
    for (let i = 0; i < sprintDuration - 1; i++) {
        const resultDay = {};
        const currentDay = new Date(sprintStart.getTime() + oneDay * i);
        resultDay.currentDay = currentDay;
        resultDay.shortDate = currentDay.toDateString().slice(0,10);
        dayList.push(resultDay);
    }
    const issueList = issues.map(issue => {
        const schedule = Array(sprintDuration);
        schedule.fill(' ',0,sprintDuration -1);
        const daysInOneIssue = days.filter(day => day.issueID === issue.id);
        daysInOneIssue.forEach(day => {
            const workWith = day.workWith;
            if (Array.isArray(schedule[day.dayNumber])) {
                schedule[day.dayNumber].push(workWith);
            } else  schedule[day.dayNumber] = [workWith];
        })
        return {
            issueId: issue.id,
            description: issue.description,
            schedule
        }
    });
    return {dayList, issueList};
}

