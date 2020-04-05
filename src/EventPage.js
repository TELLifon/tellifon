import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { useParams } from "react-router-dom";
import defaultImage from "./default-image.jpeg";
import LaunchIcon from "@material-ui/icons/Launch";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
  actionButtons: {
    textAlign: "right",
  },
  actionButton: {
    marginLeft: theme.spacing(2),
  },
  heroImage: {
    width: "100%",
    maxHeight: theme.spacing(20),
    objectFit: "cover",
  },
}));

const CategoryPage = () => {
  const { eventId } = useParams();
  const classes = useStyles();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${eventId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setEvent(result);
        },
        (error) => {
          console.error(error);
        }
      );
  }, [eventId]);

  return event ? (
    <div>
      <img
        src={event.img_src || defaultImage}
        alt={event.name}
        className={classes.heroImage}
      />
      <br />
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h4" gutterBottom>
            {event.name}
          </Typography>
        </Grid>
        {window.innerWidth > 768 ? (
          <Grid item xs={12} sm={8} className={classes.actionButtons}>
            <Button
              size="large"
              startIcon={<LaunchIcon />}
              color="primary"
              variant="outlined"
              component={Link}
              href={`https://meet.tellifon.ch/${event.id}`}
              target="_blank"
              rel="noopener"
            >
              Open Event
            </Button>
          </Grid>
        ) : null}
      </Grid>
      <Typography variant="body2" color="textSecondary" component="p">
        {new Date(event.starttime).toLocaleDateString()} from{" "}
        {new Date(event.starttime).toLocaleTimeString()} until{" "}
        {new Date(event.endtime).toLocaleDateString() ===
        new Date(event.starttime).toLocaleDateString()
          ? ""
          : `${new Date(event.endtime).toLocaleDateString()} `}
        {new Date(event.endtime).toLocaleTimeString()}
      </Typography>
      {event.moderator ? (
        <Typography variant="body2" color="textSecondary" component="p">
          By {event.moderator}
        </Typography>
      ) : null}
      <br />
      <br />
      <Typography variant="body1" gutterBottom>
        {event.description}
      </Typography>
      <br />
      <br />
      {window.innerWidth <= 768 ? (
        <Button
          size="large"
          startIcon={<LaunchIcon />}
          color="primary"
          variant="outlined"
          component={Link}
          href={`https://meet.tellifon.ch/${event.id}`}
          target="_blank"
          rel="noopener"
          fullWidth
        >
          Open Event
        </Button>
      ) : null}
    </div>
  ) : null;
};

export default CategoryPage;
