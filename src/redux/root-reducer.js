import {combineReducers} from 'redux';

import sprintsReducer from './sprints/sprints-reducer';
import teamReducer from './team/team-reducer'
import issuesReducer from "./issues/issue-reducer";
import daysReducer from './days/days-reducer';

const rootReducer = combineReducers({
    sprints: sprintsReducer,
    team: teamReducer,
    issues: issuesReducer,
    days: daysReducer,
})

export default rootReducer;
