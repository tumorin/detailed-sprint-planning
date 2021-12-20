import './Schedule.css';
import AllyLabel from "../../AllyLabel/AllyLabel";

function prepareDayList(issues, sprint, days) {
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
            schedule
        }
    });
    return {dayList, issueList};
}

const renderRow = (issue) => {
    return (
        issue.schedule.map((issueDay, index) => {
            if (Array.isArray(issueDay)) {
               return (
                   <div className="schedule-issue-day" key={index}>
                       {issueDay.map(day => <AllyLabel label={day} key={index + day}/>)}
                   </div>
               )
            } else {
                return(
                    <div className="schedule-issue-day" key={index}>
                        {issueDay}
                    </div>
                )
            }}
            )
        )

}

export default function Schedule({issues, sprint, days}) {
    if (!sprint) return null;
    // console.log('Store in render',days);
    const {dayList, issueList} = prepareDayList(issues, sprint, days);
    // console.log(issueList)
    return (
        <>
            <div className="schedule-container">
                <div className="schedule-heading">
                    {dayList.map(day => {
                        return (
                            <span className="schedule-heading-cell" key={day.currentDay}>{day.shortDate}</span>
                        )
                    })}
                </div>
                {issueList.map( issue => {
                    return (
                        <div className="schedule-row" key={issue.issueId}>
                            {renderRow(issue)}
                        </div>
                    )
                })}
            </div>
        </>
    )
}