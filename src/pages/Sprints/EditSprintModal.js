import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setSprint} from "../../redux/sprints/sprints-actions";

export function EditSprintModal ({setIsEditModalOpen, sprint = {id: '', name: '', start: '', end: '', goal: ''}}) {
    const [editFormData, setEditFormData] = useState(sprint);
    const dispatch = useDispatch();

    useEffect(() => {
        if (sprint) {
            setEditFormData({...sprint});
        }
    },[sprint]);

    function handleCloseModal() {
        setIsEditModalOpen(false);
    }

    function saveEditHandle() {
        dispatch(setSprint(editFormData));
        setIsEditModalOpen(false);
    }

    function onChangeEditFormHandler(event, field) {
        const newState = {...editFormData, ...{[field]: event.target.value}};
        setEditFormData(newState);
    }

    return (
        <Dialog
            open={true}
            onClose={handleCloseModal}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Edit the sprint</DialogTitle>
            <DialogContent>
                {/*<DialogContentText>Edit the sprint details</DialogContentText>*/}
                <TextField
                    value={editFormData.id}
                    onChange={(event) => onChangeEditFormHandler(event,"id")}
                    required
                    autoFocus
                    margin="normal"
                    id="sprintId"
                    label="Sprint №"
                    type="text"
                    fullWidth
                />
                <TextField
                    value={editFormData.name}
                    onChange={(event) => onChangeEditFormHandler(event,"name")}
                    margin="normal"
                    id="sprintName"
                    label="Sprint name"
                    type="text"
                    fullWidth
                />
                <TextField
                    value={editFormData.start}
                    onChange={(event) => onChangeEditFormHandler(event,"start")}
                    sx={{margin: "20px"}}
                    required
                    margin="normal"
                    id="sprintStart"
                    label="Sprint start date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    value={editFormData.end}
                    onChange={(event) => onChangeEditFormHandler(event,"end")}
                    sx={{margin: "20px"}}
                    required
                    margin="normal"
                    id="sprintEnd"
                    label="Sprint end date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    value={editFormData.goal}
                    onChange={(event) => onChangeEditFormHandler(event,"goal")}
                    margin="normal"
                    id="sprintGoal"
                    label="Sprint goal"
                    type="text"
                    fullWidth
                />
                <DialogActions>
                    <Button onClick={ () => setIsEditModalOpen(false)} color="primary">Cancel</Button>
                    <Button onClick={saveEditHandle} color="primary">Save</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}