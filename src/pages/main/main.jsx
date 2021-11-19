import './main.css';
import {useEffect} from "react";
import {useSelector} from "react-redux";
// components
import MainHeader from '../../components/main-header/main-header';
import MainFooter from '../../components/main-footer/main-footer';
import IssueTable from '../../components/issue-table/issue-table';
// selectors
import {getCurrentSprint} from "../../redux/sprints/sprints-selectors";
import {loadSprints, loadTeam, loadIssues, LoadDays} from '../../integration/data-integration';
import {getTeam} from "../../redux/team/team-selectors";
import {getIssues} from "../../redux/issues/issue-selector";
import {getDays} from '../../redux/days/days-selectors'

function Main() {
    const sprint = useSelector(getCurrentSprint);
    const team = useSelector(getTeam);
    const issues = useSelector(getIssues);
    const days = useSelector(getDays);
    console.log(sprint, team);
    useEffect(() => {
        if (!sprint) {
            loadSprints();
        }
        if (team.length === 0) {
            loadTeam();
        }
        if (issues.length === 0) {
            loadIssues();
        }
        if (days.length === 0) {
            LoadDays();
        }
    },[sprint, team])
    return(
        <div className="main-container">
            <MainHeader />
            <IssueTable />
            <MainFooter />
        </div>
    )
}

export default Main;