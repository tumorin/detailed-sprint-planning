import './EditIssue.css';
import classnames from 'classnames';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTeam} from "../../../../redux/team/team-selectors";
import AllyLabel from "../AllyLabel/AllyLabel";
import {addDays} from "../../../../redux/days/days-actions";
import {addNewIssue} from "../../../../redux/issues/issues-actions";

export default function EditIssue({active, setActive, sprint, _issueId}) {
    const [issueId, setIssueId] = useState(_issueId);
    const [issueDescription, setIssueDescription] = useState('');
    const [ally, setAlly] =useState('');
    const [fromDate,setFromDate] = useState('');
    const [toDate,setToDate] = useState('');
    const [assigneedList, setAssigneedList] = useState([]);
    const team = useSelector(getTeam);
    const dispatch = useDispatch();

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
        if (ally && fromDate && toDate) {
            const sprintStart = new Date(sprint.start);
            const sprintEnd = new Date(sprint.end);
            const firstDayOfAssigned = new Date(fromDate);
            const lastDayOfAssigned = new Date(toDate);
            if (firstDayOfAssigned < sprintStart) {
                window.alert('From date must not be early then sprint start');
                return;
            };
            if (lastDayOfAssigned > sprintEnd) {
                console.log(lastDayOfAssigned , sprintEnd,(lastDayOfAssigned - sprintEnd) / (1000 * 3600))
                window.alert('To date must not be later then sprint end');
                return;
            };
            if (lastDayOfAssigned < firstDayOfAssigned) {
                window.alert('From date must not be early then To date');
                return;
            };
            const id = Date.now();
            setAssigneedList((oldList) => [...oldList, {id, ally, fromDate, toDate}])
        } else window.alert('Please fill in data correctly');
    }

    function deleteAssigneeHandler(id) {
        setAssigneedList(assigneedList.filter(assignee => assignee.id !== id));
    }

    function changeFromDateHandler(e) {
        setFromDate(e.target.value);
    }
    function changeToDateHandler(e) {
        setToDate(e.target.value);
    }

    function createIssueHandler(e) {
        const oneDay = 1000 * 3600 * 24;
        e.preventDefault();
        if (!issueId) {
            alert('Please enter valid issue Id');
            return;
        }
        if (!issueDescription) {
            alert('Please enter valid issue description');
            return;
        }
        dispatch(addNewIssue({
            "id": issueId,
            "description": issueDescription,
            "status": "to do",
        }));
        const daysToAdd = [];
        assigneedList.forEach(assigneed => {
            const firstDayOfAssigned = new Date(assigneed.fromDate);
            const lastDayOfAssigned = new Date(assigneed.toDate);
            console.log(firstDayOfAssigned + 0, lastDayOfAssigned);
            for (let j = 0, current = new Date(assigneed.fromDate); current < lastDayOfAssigned; j++, current.setDate(current.getDate() + 1)) {
                daysToAdd.push({
                    sprintID: sprint.id,
                    issueID: issueId,
                    workWith: [assigneed.ally],
                    dayNumber: j,
                })
            }
        });
        dispatch(addDays(daysToAdd));
        setActive(false);
        // console.log(issueId, sprint, issueDescription, assigneedList)
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
                    <hr/>
                    <div className="edit-issue-assignee-container">
                        <label>
                         Assignee
                         <select value={ally} onChange={changeAllyHandler}>
                             <option value='' key='blank value'> </option>
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
                    <hr />
                    <div className="edit-issue-assigned-container">
                        {assigneedList.map(assigned => {
                            return (
                                <div className="edit-issue-assigned-row" key={assigned.id}>
                                    <AllyLabel label={assigned.ally} key={assigned.ally}/>
                                    <span>Date:</span>
                                    <span>{assigned.fromDate}</span>
                                    <span>-</span>
                                    <span>{assigned.toDate}</span>
                                    <div className="edit-issue-assigneed-delete-button" onClick={() =>deleteAssigneeHandler(assigned.id)}>
                                        <span className="fa fa-trash"></span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <hr />
                    <div className="buttons-container">
                        <button onClick={createIssueHandler}>Create</button>
                        <button>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}