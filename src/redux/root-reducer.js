import {combineReducers} from 'redux';

import sprintsReducer from './sprints/sprints-reducer';

const rootReducer = combineReducers({
    sprints: sprintsReducer,
    // team: teamReducer,
    // days: daysReducer,
})

export default rootReducer;
