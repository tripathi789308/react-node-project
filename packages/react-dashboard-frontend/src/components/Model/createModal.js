import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const CreateModal = ({ open, onClose, onSave, selectedId }) => {
  const [inputValue, setInputValue] = useState({ agent_id: selectedId });

  const elements = [
    {
      label: "Name",
      name: "name",
    },
    {
      label: "Email",
      name: "email",
    },
    {
      label: "Mobile",
      name: "mobile",
    },
  ];

  const handleClose = () => {
    onClose();
    setInputValue(""); // Clear input field when the dialog is closed
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSave = () => {
    onSave(inputValue);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a Customer for this Agent</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter the data you want to save:</DialogContentText>
        {elements.map((element, index) => (
          <TextField
            autoFocus
            key={index}
            fullWidth
            margin="dense"
            label={element.label}
            name={element.name}
            type="text"
            value={inputValue[element.name]}
            onChange={(e) => handleChange(e)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateModal;
