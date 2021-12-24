import './IssueList.css';
import {useDispatch} from "react-redux";
import {deleteIssue} from "../../../../../redux/issues/issues-actions";
import {deleteDaysByIssueId} from "../../../../../redux/days/days-actions";

export default function IssueList({issues, setEditIssueActive}) {

    const dispatch = useDispatch();

    function deleteIssueHandler(issueId) {
        if (window.confirm("Are you sure you want to delete the issue?")) {
            dispatch(deleteIssue(issueId));
            dispatch(deleteDaysByIssueId(issueId));
        }
    }

    function editIssueHandler(issueId) {
        setEditIssueActive({isActive:true, issueIdToEdit:issueId});
    }

    const issueElems = issues.map(({id, description}) => {
        return (
            <div className="issue-list-row" key={id}>
                <div className="issue-list-id">
                    {id}
                </div>
                <div className="issue-list-description">
                    {description}
                </div>
                <div className="issue-list-active-button-container">
                    <button className="action-button" onClick={() => editIssueHandler(id)}><span className="fa fa-edit "></span></button>
                    <button className="action-button" onClick={() => deleteIssueHandler(id)}><span className="fa fa-trash "></span></button>
                </div>

            </div>
        )
    })
    return (
        <>
            <div className="issue-list-container">
                <div className="issue-list-heading">
                    <div className="issue-list-id">№</div>
                    <div className="issue-list-description">Description</div>
                    <button className="issue-list-add-button"
                            onClick={() => setEditIssueActive({isActive:true, issueIdToEdit:''})}>
                           <span className="fa fa-plus-circle"></span>
                    </button>
                </div>
                {issueElems}
            </div>
        </>
    )
}