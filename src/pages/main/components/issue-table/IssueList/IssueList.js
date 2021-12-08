import './IssueList.css';

export default function IssueList({issues, setEditIssueActive}) {
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
                    <button className="action-button "><span className="fa fa-edit "></span></button>
                    <button className="action-button "><span className="fa fa-trash "></span></button>
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
                            onClick={() => setEditIssueActive(true)}>
                           <span className="fa fa-plus-circle"></span>
                    </button>
                </div>
                {issueElems}
            </div>
        </>
    )
}