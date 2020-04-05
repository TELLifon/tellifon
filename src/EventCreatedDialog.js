import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useTranslation } from "react-i18next";

const EventCreatedDialog = ({ isOpen, handleClose, eventId }) => {
  const url = `${window.location.protocol}//${window.location.host}/events/${eventId}`;
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">{t("created.title")}</DialogTitle>
      <DialogContent>
        <Typography>{t("created.text")}</Typography>
        <br />
        <Link href={url} target="_blank" rel="noopener">
          {url}
        </Link>
        <br />
        <br />
        <Typography>{t("created.link")}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={handleClose}>
          {t("created.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventCreatedDialog;
