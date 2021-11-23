import './issue-table.css';
import IssueList from './IssueList/IssueList';
import Schedule from './Schedule/Schedule';


function IssueTable({issues}) {

    return(
        <div className="issue-table-container">
            <IssueList issues={issues}/>
            <Schedule />
        </div>
    )
}

export default IssueTable;
