import EditIssue from "./EditIssue";
import {renderWithRedux} from "../../../../utils/testUtils";
import userEvent from "@testing-library/user-event";
import {getByText, screen} from "@testing-library/react";

describe("EditIssue", () => {
    it('render EditIssue with empty state', () => {
        const {getByText} = renderWithRedux(<EditIssue />);
        expect(getByText('Create new Issue')).toBeInTheDocument();
    });
    it('enter issueId into the input field', () => {
        const state = {sprints: [{
                "id": 3,
                "name": 'Sprint Odin',
                "start": '2021-12-22',
                "end": '2022-01-04',
                "goal": 'pred-realize version'
            }],
            team: [
                {
                    "name": "Bill",
                    "surname": 'Gates',
                    "nick": "BG",
                    "active": true,
                },
            ],
            issues: [
                {
                    "id": '1',
                    "description": 'Set up the project on devs machines',
                    "status": "in progress",
                },
            ],
            days: [
                {
                    "sprintID": 3,
                    "dayNumber": 2,
                    "issueID": '1',
                    "workWith": "BG"
                },
                {
                    "sprintID": 3,
                    "dayNumber": 4,
                    "issueID": '1',
                    "workWith": "BG"
                },
            ]
        };
        const {getByLabelText} = renderWithRedux(<EditIssue />, {initialState: state});
        expect(getByLabelText('Assignee')).toBeInTheDocument();
        const issueIdField = getByLabelText('Issue id');
        expect(issueIdField.value).toBeFalsy();
        userEvent.type(issueIdField,'31415926');
        expect(issueIdField.value).toBe('31415926');
    });
    it('add issue', () => {
        const state = {sprints: [{
                "id": 3,
                "name": 'Sprint Odin',
                "start": '2021-12-22',
                "end": '2022-01-04',
                "goal": 'pred-realize version'
            }],
            team: [
                {
                    "name": "Bill",
                    "surname": 'Gates',
                    "nick": "BG",
                    "active": true,
                },
            ],
            issues: [
                {
                    "id": '1',
                    "description": 'Set up the project on devs machines',
                    "status": "in progress",
                },
            ],
            days: [
                {
                    "sprintID": 3,
                    "dayNumber": 2,
                    "issueID": '1',
                    "workWith": "BG"
                },
                {
                    "sprintID": 3,
                    "dayNumber": 4,
                    "issueID": '1',
                    "workWith": "BG"
                },
            ]
        };
        const {getByLabelText, getByText} = renderWithRedux(<EditIssue
            sprint={state.sprints} setActive={() => {}} />, {initialState: state});
        const issueIdField = getByLabelText('Issue id');
        userEvent.type(issueIdField,'31415926');
        const issueDescriptionField = getByLabelText('Issue description');
        userEvent.type(issueDescriptionField,'Description for test issue');
        const createBtn = getByText('Create');
        userEvent.click(createBtn);
        // expect(state.issues.length).toBe(2);
    });
});

