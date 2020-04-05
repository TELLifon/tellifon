import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import EventCreatedDialog from "./EventCreatedDialog";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  imagePreview: {
    marginTop: theme.spacing(2),
    maxHeight: theme.spacing(24),
    objectFit: "cover",
    width: "100%",
  },
  dropzone: {
    border: "1px dashed gray",
    padding: theme.spacing(5),
    textAlign: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
  },
}));

const CreateEventDialog = ({ isOpen, handleClose, categoryId }) => {
  const classes = useStyles();
  const [createdEventId, setCreatedEventId] = useState("");

  var now = new Date();
  var inOneHour = new Date();
  inOneHour.setHours(inOneHour.getHours() + 2);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(now);
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [endTime, setEndTime] = useState(inOneHour);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [moderatorName, setModeratorName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [image, setImage] = useState(null);
  const { t } = useTranslation();

  const onDrop = useCallback((acceptedFiles) => {
    setImage(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("name", title);
    formData.append("starttime", startTime.toISOString());
    formData.append("endtime", endTime.toISOString());
    formData.append("description", description);
    formData.append("moderator", moderatorName);
    formData.append("is_public", isPublic);
    if (image) {
      formData.append("image", image);
    }

    const rawRes = await fetch(`/api/categories/${categoryId}/events`, {
      method: "POST",
      body: formData,
    });
    const res = await rawRes.json();

    setTitle("");
    setDescription("");
    setModeratorName("");
    setImage(null);
    now = new Date();
    inOneHour = new Date();
    inOneHour.setHours(inOneHour.getHours() + 2);
    setStartTime(now);
    setEndTime(inOneHour);
    handleClose();

    setCreatedEventId(res.id);
  };

  const allFieldsValid = () => {
    return (
      title !== "" &&
      description !== "" &&
      startTime instanceof Date &&
      !isNaN(startTime) &&
      endTime instanceof Date &&
      !isNaN(endTime)
    );
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{t("create.title")}</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="title"
            label={t("create.label.title")}
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            id="description"
            label={t("create.label.description")}
            multiline
            fullWidth
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            id="moderator-name"
            label={t("create.label.moderator")}
            fullWidth
            value={moderatorName}
            onChange={(e) => {
              setModeratorName(e.target.value);
            }}
          />
          <br />
          <br />
          {image ? (
            <>
              <img
                src={image.preview}
                alt="preview"
                className={classes.imagePreview}
              />
              <Button
                color="secondary"
                onClick={() => {
                  setImage(null);
                }}
              >
                {t("create.label.image.clear")}
              </Button>
            </>
          ) : (
            <div className={classes.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>{t("create.label.image.drop")}</p>
              ) : (
                <p>{t("create.label.image.drag-drop")}</p>
              )}
            </div>
          )}
          <br />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                open={isStartDatePickerOpen}
                onOpen={() => {
                  setIsStartDatePickerOpen(true);
                }}
                onClose={() => {
                  setIsStartDatePickerOpen(false);
                }}
                onChange={(d) => {
                  setStartTime(d);
                  setIsStartDatePickerOpen(false);
                }}
                label={t("create.label.dates.start.date")}
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                value={startTime}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                label={t("create.label.dates.start.time")}
                margin="normal"
                id="time-picker"
                value={startTime}
                onChange={(d) => {
                  setStartTime(d);
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
                label={t("create.label.dates.end.date")}
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                value={endTime}
                open={isEndDatePickerOpen}
                onOpen={() => {
                  setIsEndDatePickerOpen(true);
                }}
                onClose={() => {
                  setIsEndDatePickerOpen(false);
                }}
                onChange={(d) => {
                  setEndTime(d);
                  setIsEndDatePickerOpen(false);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                label={t("create.label.dates.end.time")}
                margin="normal"
                id="time-picker"
                value={endTime}
                onChange={(d) => {
                  setEndTime(d);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <br />
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
            label={t("create.label.public")}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            {t("create.cancel")}
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={!allFieldsValid()}
            onClick={handleCreate}
          >
            {t("create.create")}
          </Button>
        </DialogActions>
      </Dialog>

      <EventCreatedDialog
        isOpen={Boolean(createdEventId)}
        eventId={createdEventId}
        handleClose={() => {
          setCreatedEventId("");
        }}
      />
    </>
  );
};

export default CreateEventDialog;
