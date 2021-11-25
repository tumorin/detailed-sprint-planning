import './IssueList.css';

export default function IssueList({issues}) {
    const issueElems = issues.map(({id, description}) => {
        return (
            <div className="issue-list-row" key={id}>
                <div className="issue-list-id">
                    {id}
                </div>
                <div className="issue-list-description">
                    {description}
                </div>
                <button className="action-button "><span className="fa fa-edit delete-icon"></span></button>
                <button className="action-button "><span className="fa fa-trash delete-icon"></span></button>
            </div>
        )
    })
    return (
        <>
            <div className="issue-list-container">
                <div className="issue-list-heading">
                    <div className="issue-list-id">№</div>
                    <div className="issue-list-description">Description</div>
                </div>
                {issueElems}
            </div>
        </>
    )
}