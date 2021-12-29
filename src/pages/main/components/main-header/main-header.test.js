import MainHeader from "./main-header";
import {renderWithRedux} from "../../../../utils/testUtils";

describe("main-header", () => {
    it('render main-header with empty state', () => {
        const {getByText} = renderWithRedux(<MainHeader />);
        expect(getByText('Application is loading')).toBeInTheDocument();
    });
    it('render main-header with state', () => {
        const state = {sprints: [{
                "id": 3,
                "name": 'Sprint Odin',
                "start": '2021-12-22',
                "end": '2022-01-04',
                "goal": 'pred-realize version'
            }]};
        const {getByText} = renderWithRedux(<MainHeader />, {initialState: state});
        expect(getByText('Has already expired')).toBeInTheDocument();
        expect(getByText('Sprint Odin')).toBeInTheDocument();
    });
});