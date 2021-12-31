import IssueList from "./IssueList";
import {renderWithRedux} from "../../../../../utils/testUtils";

describe("IssueList", () => {
    it('render IssueList with empty state', () => {
        const {getByText} = renderWithRedux(<IssueList />);
        expect(getByText('Application is loading')).toBeInTheDocument();
    });
    it('render IssueList with state', () => {
        const issues = [
            {
                "id": '1',
                "description": 'Set up the project on devs machines',
                "status": "in progress",
            }]
        const {getByText} = renderWithRedux(<IssueList issues={issues}/>);
        expect(getByText('Set up the project on devs machines')).toBeInTheDocument();
    });
});

