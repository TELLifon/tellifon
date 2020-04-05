import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const EventCreatedDialog = ({ isOpen, handleClose, eventId }) => {
  const url = `${window.location.protocol}//${window.location.host}/events/${eventId}`;

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">Event Created</DialogTitle>
      <DialogContent>
        <Typography>
          Your event has been successfully created. You can find it at the
          following location:
        </Typography>
        <br />
        <Link href={url} target="_blank" rel="noopener">
          {url}
        </Link>
        <br />
        <br />
        <Typography>
          Please write this link down and share it with the participants of your
          event.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventCreatedDialog;
