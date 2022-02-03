import './main-header.css';
import {useSelector} from "react-redux";
import {getCurrentSprint} from "../../../../redux/sprints/sprints-selectors";
import {AppBar, Toolbar, Typography} from "@mui/material";

function MainHeader() {
    const sprint = useSelector(getCurrentSprint);
    if (!sprint) return (<div>Application is loading</div>);
    return(
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component={"span"}
                        sx={{flexGrow: 1}}
                    >
                        {sprint.name}
                    </Typography>
                    <Typography
                        variant="body1"
                        component={"span"}
                        sx={{flexGrow: 1}}
                    >
                        {`Sprint from ${sprint.start} to ${sprint.end}`}
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default MainHeader;