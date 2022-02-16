import {useSelector} from "react-redux";
import {getSprints} from "../../redux/sprints/sprints-selectors";
import {useEffect} from "react";
import {loadSprints} from "../../services/data-integration";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const Sprints = () => {
    const sprints = useSelector(getSprints);

    useEffect(() => {
        if (!sprints) {
            loadSprints();
        }
    });

    function editSprintHandler(sprintId) {
        // setEditIssueActive({isActive: true, issueIdToEdit: issueId});
    }

    if (!sprints) return (
        <div>Data is loading</div>
    )
    console.log(sprints)
    const columns = [
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            getActions: (params) => [
                <GridActionsCellItem icon={<EditIcon />} onClick={() => {editSprintHandler(params.id)}} label="Edit"/>,
                <GridActionsCellItem icon={<DeleteIcon />} onClick={() => {editSprintHandler(params.id)}} label="Delete" />,
            ],
        },
        { field: 'id', headerName: 'Sprint №', width: 150 },
        { field: 'name', headerName: 'Sprint name', width: 350 },
        { field: 'start', headerName: 'Sprint start date', width: 200 },
        { field: 'end', headerName: 'Sprint end date', width: 200 },
        { field: 'goal', headerName: 'Sprint goal', width: 450 },
    ];

    const rows = sprints.map(sprint => {
        const sprintInGrid = {};
        sprintInGrid.id = sprint.id;
        sprintInGrid.name = sprint.name;
        sprintInGrid.start = sprint.start;
        sprintInGrid.end = sprint.end;
        sprintInGrid.goal = sprint.goal;
        return sprintInGrid
    });

    return (
        <div style={{ height: "100%", width: '100%'}}>
            <DataGrid  columns={columns} rows={rows}
                       hideFooter
            />
        </div>
    )
}