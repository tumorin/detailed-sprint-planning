import './Schedule.css';
import AllyLabel from "../../AllyLabel/AllyLabel";
import {prepareDayList} from "../../../../../utils/dayUtils";

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
    const {dayList, issueList} = prepareDayList(issues, sprint, days);
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