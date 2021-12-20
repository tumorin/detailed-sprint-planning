import './EditIssue.css';
import classnames from 'classnames';
import {useState} from "react";
import {useDispatch, useSelector, useStore} from "react-redux";
import {getTeam} from "../../../../redux/team/team-selectors";
import AllyLabel from "../AllyLabel/AllyLabel";
import {addDays, deleteDaysByIssueId} from "../../../../redux/days/days-actions";
import {addNewIssue, deleteIssue} from "../../../../redux/issues/issues-actions";
import {getIssueById, getIssues} from "../../../../redux/issues/issue-selector";
import {getDaysByIssueId} from "../../../../redux/days/days-selectors";

export default function EditIssue({active, setActive, sprint, issueIdToEdit}) {
    const [isPropertyForEditingSet, setIsPropertyForEditingSet] =useState(false);
    const [issueId, setIssueId] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [ally, setAlly] =useState('');
    const [fromDate,setFromDate] = useState('');
    const [toDate,setToDate] = useState('');
    const [assigneedList, setAssigneedList] = useState([]);

    const team = useSelector(getTeam);
    const issues = useSelector(getIssues);
    const state = useStore().getState();

    const dispatch = useDispatch();

    function prepareAssigneedList(daysForIssue, sprint) {
        function getSprintDayByNumber(sprint, dayNumber) {
            const sprintStart = new Date(sprint.start);
            const oneDay = 1000 * 3600 * 24;
            return (new Date(sprintStart.getTime() + oneDay * dayNumber)).toDateString()
        }

       const result = [];
       const daysForIssueForSprint = daysForIssue.filter(day => day.sprintID === sprint.id);
       const allys =  new Set();
       daysForIssueForSprint.forEach(day => {
           allys.add(day.workWith);
       })
        allys.forEach(ally => {
            const daysForAlly = daysForIssueForSprint.filter(day => day.workWith === ally);
            console.log(ally, daysForAlly);
            const firstDayOfAssign = daysForAlly[0];
            let previousDayOfAssign = {...firstDayOfAssign};
            let isFirstOnSeq = true;
            daysForAlly.forEach( (day, index) => {
                const isLastElem = (index === daysForAlly.length -1);
                const isNoNextElem = (!daysForAlly[index + 1]);
                const isNextArrElemNotNextDay = (daysForAlly[index + 1]?.dayNumber !== day.dayNumber + 1);
                if (isLastElem || isNoNextElem || isNextArrElemNotNextDay) {
                    const fromDate_ = isFirstOnSeq ? day : previousDayOfAssign;
                    result.push({id: ally + index, ally,
                        fromDate: getSprintDayByNumber(sprint, fromDate_.dayNumber),
                        toDate: getSprintDayByNumber(sprint, day.dayNumber)})
                    isFirstOnSeq = true;
                    previousDayOfAssign = {...day};
                } else {
                    isFirstOnSeq = false;
                    previousDayOfAssign = {...day};
                    }
            })
        })
       return result;
    }

    const isEditMode = !!issueIdToEdit ;
    if (!isEditMode && !isPropertyForEditingSet) {
        // clear up data for creating a new issue
        setIssueId('');
        setIssueDescription('');
        setAssigneedList([]);
        setIsPropertyForEditingSet(true);
    }
    const isNewIssueToEdit = issueIdToEdit !== issueId;
    if (isEditMode && (!isPropertyForEditingSet || isNewIssueToEdit)) {
        // fill in form from issue for editing data
        const editIssue = getIssueById(issues, issueIdToEdit);
        if (!editIssue) return null;
        setIssueId(editIssue.id);
        setIssueDescription(editIssue.description);
        const daysForIssue = getDaysByIssueId(state, editIssue.id);
        setAssigneedList(prepareAssigneedList(daysForIssue, sprint));
        setIsPropertyForEditingSet(true);
    }

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
            }
            if (lastDayOfAssigned > sprintEnd) {
                window.alert('To date must not be later then sprint end');
                return;
            }
            if (lastDayOfAssigned < firstDayOfAssigned) {
                window.alert('From date must not be early then To date');
                return;
            }
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

        let isIdFound = false;
        for (let i = 0; i < issues.length; i ++) {
            if (issues[i].id === issueId) {
                isIdFound = true;
                break;
            }
        }
        if (isIdFound && !isEditMode) {
            alert('Issue ID must be unique');
            return
        }
        if (isEditMode) {
            // delete old issue and days records from state
            dispatch(deleteIssue(issueId));
            dispatch((deleteDaysByIssueId(issueId)))
        }
        dispatch(addNewIssue({
            "id": issueId,
            "description": issueDescription,
            "status": "to do",
        }));
        const daysToAdd = [];
        const sprintStart = new Date(sprint.start);
        assigneedList.forEach(assigneed => {
            const firstDayOfAssigned = new Date(assigneed.fromDate);
            const lastDayOfAssignedPlusOne = new Date(assigneed.toDate);
            lastDayOfAssignedPlusOne.setDate(lastDayOfAssignedPlusOne.getDate() + 1)
            const daysShift = Math.round((firstDayOfAssigned - sprintStart) / oneDay);
            for (let j = 0, current = new Date(assigneed.fromDate); current < lastDayOfAssignedPlusOne; j++, current.setDate(current.getDate() + 1)) {
                daysToAdd.push({
                    sprintID: sprint.id,
                    issueID: issueId,
                    workWith: assigneed.ally,
                    dayNumber: j + daysShift,
                })
            }
        });
        dispatch(addDays(daysToAdd));
        setIsPropertyForEditingSet(false);
        setActive(false);
    }
    function cancelIssueHandler(e) {
        e.preventDefault();
        setIsPropertyForEditingSet(false);
        setActive(false);
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
                        <button onClick={cancelIssueHandler}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}