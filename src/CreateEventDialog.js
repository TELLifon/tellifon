import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDropzone } from "react-dropzone";

const CreateEventModal = ({ isOpen, handleClose, categoryId }) => {
  const now = new Date();
  const inOneHour = now;
  inOneHour.setHours(inOneHour.getHours() + 2);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState(
    now.toISOString().substring(0, -1)
  );
  const [endTime, setEndTime] = useState(
    inOneHour.toISOString().substring(0, -1)
  );
  const [description, setDescription] = useState("");
  const [moderatorName, setModeratorName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [image, setImage] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("starttime", startTime);
    formData.append("endtime", endTime);
    formData.append("description", description);
    formData.append("moderator", moderatorName);
    formData.append("is_public", isPublic);
    formData.append("image", image);

    await fetch(`/api/categories/${categoryId}/events`, {
      method: "POST",
      body: formData,
    });
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Event</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          id="name"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        <br />
        <TextField
          id="start-time"
          label="Start Time"
          type="datetime-local"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={startTime}
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
        />
        <br />
        <TextField
          margin="normal"
          id="end-time"
          label="End Time"
          type="datetime-local"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={endTime}
          onChange={(e) => {
            setEndTime(e.target.value);
          }}
        />
        <br />
        <TextField
          margin="normal"
          id="description"
          label="Description"
          multiline
          fullWidth
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <br />
        <TextField
          margin="normal"
          id="moderator-name"
          label="Moderator Name (Optional)"
          fullWidth
          value={moderatorName}
          onChange={(e) => {
            setModeratorName(e.target.value);
          }}
        />
        <Checkbox
          checked={isPublic}
          onChange={(e) => {
            setIsPublic(e.target.checked);
          }}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventModal;
