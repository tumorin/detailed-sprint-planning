import './EditIssue.css';
import classnames from 'classnames';
import {useState} from "react";
import {useSelector} from "react-redux";
import {getTeam} from "../../../../redux/team/team-selectors";

export default function EditIssue({active, setActive}) {
    const [issueId, setIssueId] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [ally, setAlly] =useState('');
    const [fromDate,setFromDate] = useState('');
    const [toDate,setToDate] = useState('');
    const [assigneedList, setAssigneedList] = useState([]);
    const team = useSelector(getTeam);
    function changeIdHandler(e) {
        setIssueId(e.target.value);
    }
    function changeDescriptionHandler(e) {
        setIssueDescription(e.target.value);
    }
    function changeAllyHandler(e) {
        setAlly(e.target.value);
    }
    function addAssigneeHandler() {
        setAssigneedList((oldList) => [...oldList, {ally,fromDate,toDate}])
    }
    function changeFromDateHandler(e) {
        setFromDate(e.target.value);
    }
    function changeToDateHandler(e) {
        setToDate(e.target.value);
    }
    return (
        <div className={classnames("edit-issue-modal" , {'active': active})}
             onClick={()=> setActive(false)}>
            <div className={classnames("edit-issue-container", {'active': active})}
                 onClick={e => e.stopPropagation()}>
                <div className="edit-issue-header">
                     Create new Issue
                </div>
                <form>
                    <div className="edit-issue-id-and-description-container">
                        <label>
                            Issue id
                            <input type="text" value={issueId} onChange={changeIdHandler}/>
                        </label>
                        <label>
                            Issue description
                            <input type="text" value={issueDescription} onChange={changeDescriptionHandler}/>
                        </label>
                    </div>
                    <div className="edit-issue-assignee-container">
                        <label>
                         Assignee
                         <select value={ally} onChange={changeAllyHandler}>
                             {team.map((ally => {
                                 return (
                                     <option value={ally.nick} key={ally.nick}>
                                         {ally.name + ' ' + ally.surname}
                                     </option>)
                             }))}
                            </select>
                        </label>
                        <label>
                            From
                            <input type="date" value={fromDate} onChange={changeFromDateHandler}/>
                        </label>
                        <label>
                            To
                            <input type="date" value={toDate} onChange={changeToDateHandler}/>
                        </label>
                        <div className="edit-issue-assignee-plus-button" onClick={addAssigneeHandler}>
                            <span className="fa fa-plus-square"></span>
                        </div>
                    </div>
                    <div className="edit-issue-assigned-container">
                        {assigneedList.map(assigned => {
                            return (
                                <div className="edit-issue-assigned-row">
                                    {/*<div>{assigned.ally}</div>*/}
                                    {/*<div>{assigned.fromDate}</div>*/}
                                    {/*<div>{assigned.toDate}</div>*/}
                                </div>
                            )
                        })}
                    </div>
                    <div className="buttons-container">
                        <button>Create</button>
                        <button>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}