import './issue-table.css';
import IssueList from './IssueList/IssueList';
import Schedule from './Schedule/Schedule';
import EditIssue from "../EditIssue/EditIssue";
import {useState} from "react";


function IssueTable({issues, sprint, days}) {
    const [editIssueActive, setEditIssueActive] = useState(false)
    return(
        <div className="issue-table-container">
            <IssueList issues={issues} setEditIssueActive={setEditIssueActive}/>
            <Schedule
                issues={issues}
                sprint={sprint}
                days={days}
            />
            <EditIssue active={editIssueActive} setActive={setEditIssueActive} sprint={sprint} _issueId={''}/>
        </div>
    )
}

export default IssueTable;
