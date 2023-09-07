import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const EditDialog = ({ open, handleClose, rowData, handleSave }) => {
  const [editedData, setEditedData] = useState({ ...rowData });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSaveClick = () => {
    // Call the handleSave function with the edited data
    handleSave(editedData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit the details for the selected item.
        </DialogContentText>
        {Object.keys(editedData).map((data, index) => {
          return (
            data !== "agent_id" &&
            data !== "id" &&
            data !== "created_at" && (
              <TextField
                key={index}
                autoFocus
                margin="dense"
                label={data}
                type="text"
                name={data}
                value={editedData[data]}
                onChange={handleInputChange}
                fullWidth
              />
            )
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveClick} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
