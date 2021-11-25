import './issue-table.css';
import IssueList from './IssueList/IssueList';
import Schedule from './Schedule/Schedule';


function IssueTable({issues, sprint, days}) {

    return(
        <div className="issue-table-container">
            <IssueList issues={issues}/>
            <Schedule
                issues={issues}
                sprint={sprint}
                days={days}
            />
        </div>
    )
}

export default IssueTable;
