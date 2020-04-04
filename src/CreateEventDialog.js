import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDropzone } from "react-dropzone";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";

const CreateEventModal = ({ isOpen, handleClose, categoryId }) => {
  const now = new Date();
  const inOneHour = new Date();
  inOneHour.setHours(inOneHour.getHours() + 2);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState(now);
  const [endTime, setEndTime] = useState(inOneHour);
  const [description, setDescription] = useState("");
  const [moderatorName, setModeratorName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
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
    if (image) {
      formData.append("image", image);
    }

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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              label="Start date"
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={startTime}
              onChange={(d) => {
                setStartTime(d.toISOString());
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              label="Start time"
              margin="normal"
              id="time-picker"
              value={startTime}
              onChange={(d) => {
                setStartTime(d.toISOString());
              }}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <br />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              label="End date"
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={endTime}
              onChange={(d) => {
                setEndTime(d.toISOString());
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              label="End time"
              margin="normal"
              id="time-picker"
              value={endTime}
              onChange={(d) => {
                setEndTime(d.toISOString());
              }}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
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
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={isPublic}
              onChange={(e) => {
                setIsPublic(e.target.checked);
              }}
              inputProps={{ "aria-label": "" }}
            />
          }
          label="Make event public"
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
