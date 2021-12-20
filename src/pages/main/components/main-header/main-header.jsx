import './main-header.css';
import {useSelector} from "react-redux";
import {getCurrentSprint} from "../../../../redux/sprints/sprints-selectors";

function MainHeader() {
    const sprint = useSelector(getCurrentSprint);
    if (!sprint) return null;
    console.log(sprint);
    return(
        <header className="header">
            <span className="sprint-name">{sprint.name}</span>
            <span className="sprint-date">{sprint.start + ' - ' + sprint.end}</span>
            <div className="sprint-legend">
                <div className="flex-row ">
                    <div className="circle yellow"></div>
                    Has already expired
                </div>
                <div className="flex-row">
                    <div className="circle green"></div>
                    Completed
                </div>
                <div className="flex-row">
                    <div className="circle red"></div>
                    Canceled
                </div>
            </div>
        </header>
    )
}

export default MainHeader;