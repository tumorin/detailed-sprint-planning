import Main from "./main";
import {renderWithRedux} from "../../utils/testUtils";

describe("Main", () => {
    it('render Main with empty state', () => {
        const {getByText, getAllByText} = renderWithRedux(<Main />);
        expect(getByText('Application is loading')).toBeInTheDocument();
        expect(getByText('Create new Issue')).toBeInTheDocument();

    });
    it('render Main with state', () => {
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
        const {getByText} = renderWithRedux(<Main />, {initialState: state});
        expect(getByText('Has already expired')).toBeInTheDocument();
        expect(getByText('Set up the project on devs machines')).toBeInTheDocument();
        // expect(getAllByText('BG')).toBeInTheDocument();
    });
});

