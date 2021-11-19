import {sprintsData, teamData, issuesData, daysData} from "./test-data";
import store from '../redux/store';
import {setSprints} from "../redux/sprints/sprints-actions";
import {setTeam} from "../redux/team/team-actions";
import {setIssues} from "../redux/issues/issues-actions";
import {setDays} from "../redux/days/days-actions";

// TODO: change to integration with backend
export const loadSprints = () => {
    store.dispatch(setSprints(sprintsData));
}

export const loadTeam = () => {
    store.dispatch(setTeam(teamData))
}

export const loadIssues = () => {
    store.dispatch(setIssues(issuesData))
}

export const LoadDays = () => {
    store.dispatch(setDays(daysData))
}