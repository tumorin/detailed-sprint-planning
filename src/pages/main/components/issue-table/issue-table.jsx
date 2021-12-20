import './issue-table.css';
import IssueList from './IssueList/IssueList';
import Schedule from './Schedule/Schedule';
import EditIssue from "../EditIssue/EditIssue";
import {useState} from "react";


function IssueTable({issues, sprint, days}) {
    const [editIssueActive, setEditIssueActive] = useState({isActive:false,issueIdToEdit: ''})
    return(
        <div className="issue-table-container">
            <IssueList issues={issues} setEditIssueActive={setEditIssueActive}/>
            <Schedule
                issues={issues}
                sprint={sprint}
                days={days}
            />
            <EditIssue active={editIssueActive.isActive} setActive={setEditIssueActive} sprint={sprint} issueIdToEdit={editIssueActive.issueIdToEdit}/>
        </div>
    )
}

export default IssueTable;
