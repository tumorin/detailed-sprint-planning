import './issue-table.css';
import EditIssue from "../EditIssue/EditIssue";
import {useState} from "react";
import {
    DataGrid,
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import {prepareDayList} from "../../../../utils/dayUtils";
import {Button,} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {deleteIssue} from "../../../../redux/issues/issues-actions";
import {deleteDaysByIssueId} from "../../../../redux/days/days-actions";
import {useDispatch} from "react-redux";
import Confirm from "../../../../components/Confirm";



function IssueTable({issues, sprint, days}) {
    const [editIssueActive, setEditIssueActive] = useState({isActive:false,issueIdToEdit: ''});
    const [confirmDialogData, setConfirmDialogData] = useState({isOpen: false,
        title: '',
        description: '',
        okHandler: Function.prototype
    });
    const dispatch = useDispatch();

    function AddNewIssueHandler(e) {
        e.preventDefault();
        setEditIssueActive({isActive: true})
    }

    function editIssueHandler(issueId) {
        setEditIssueActive({isActive: true, issueIdToEdit: issueId});
    }

    function deleteIssueCallback(issueId) {
        dispatch(deleteIssue(issueId));
        dispatch(deleteDaysByIssueId(issueId));
    }

    function deleteIssueHandler(issueId) {
        setConfirmDialogData({isOpen: true,
            title: 'Do you want to delete the issue?',
            description: 'The issue will be deleted permanently including all assignments',
            okHandler: (() => {deleteIssueCallback(issueId)}),
        });
        // if (window.confirm("Are you sure you want to delete the issue?")) {
        //     dispatch(deleteIssue(issueId));
        //     dispatch(deleteDaysByIssueId(issueId));
        // }
    }

    function IssueTableToolbar() {
        return (
            <GridToolbarContainer>
                <Button onClick={AddNewIssueHandler}>
                    <AddCircleIcon />
                    ADD NEW ISSUE
                </Button>
                <GridToolbarFilterButton />
            </GridToolbarContainer>
        );
    }

    if (!sprint) return null;

    const {dayList, issueList} = prepareDayList(issues, sprint, days);
    const columnsDays = dayList.map((day, index) => ({field: index,
                                            headerName: day.shortDate,
                                            width: 150
    }))

    const rows = issueList.map(issue => {
        const issueInGrid = {};
        issueInGrid.id = issue.issueId;
        issueInGrid.issueId = issue.issueId;
        issueInGrid.description = issue.description;
        issue.schedule.forEach((day, index) => {
            issueInGrid[index] = day;
        })
        // console.log(issueInGrid)
        return issueInGrid
    });

    let columns = [
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            getActions: (params) => [
                <GridActionsCellItem icon={<EditIcon />} onClick={() => {editIssueHandler(params.id)}} label="Edit"/>,
                <GridActionsCellItem icon={<DeleteIcon />} onClick={() => {deleteIssueHandler(params.id)}} label="Delete" />,
            ],
        },
        { field: 'issueId', headerName: 'Issue №', width: 150 },
        { field: 'description', headerName: 'Issue description', width: 350 },
    ];

    columns = [...columns, ...columnsDays];
    return(
        <>
            <div style={{ height: "100%", width: '100%'}}>
                <DataGrid rows={rows} columns={columns}
                          sx={{
                              boxShadow: 2,
                              border: 2,
                              borderColor: 'primary.light',
                              '& .MuiDataGrid-cell:hover': {
                                  color: 'primary.main',
                              },
                          }}
                          components={{
                              Toolbar: IssueTableToolbar,
                          }}
                          hideFooter
                />
            </div>
             <div className="issue-table-container">
                 {/*<IssueList issues={issues} setEditIssueActive={setEditIssueActive}/>*/}
                 {/*<Schedule*/}
                 {/*    issues={issues}*/}
                 {/*    sprint={sprint}*/}
                 {/*    days={days}*/}
                 {/*/>*/}
                 <EditIssue active={editIssueActive.isActive} setActive={setEditIssueActive} sprint={sprint} issueIdToEdit={editIssueActive.issueIdToEdit}/>
                 <Confirm open={confirmDialogData.isOpen} setOpen={setConfirmDialogData} {...confirmDialogData}/>
             </div>
        </>

    )
}

export default IssueTable;
