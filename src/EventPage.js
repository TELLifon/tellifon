import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { useParams } from "react-router-dom";
import defaultImage from "./default-image.jpeg";

const useStyles = makeStyles(theme => ({
  media: {
    height: 140
  },
  actionButtons: {
    textAlign: "right"
  },
  actionButton: {
    marginLeft: theme.spacing(2)
  },
  heroImage: {
    width: "100%",
    maxHeight: theme.spacing(20),
    objectFit: "cover"
  }
}));

const CategoryPage = () => {
  const { eventId } = useParams();
  const classes = useStyles();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${eventId}`)
      .then(res => res.json())
      .then(
        result => {
          setEvent(result);
        },
        error => {
          console.error(error);
        }
      );
  }, [eventId]);

  return event ? (
    <div>
      <img
        src={event.image_src || defaultImage}
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
        <Grid item xs={12} sm={8} className={classes.actionButtons}>
          <Button
            color="primary"
            variant="outlined"
            component={Link}
            href={`https://schwaf.li/${event.id}`}
            target="_blank"
            rel="noopener"
          >
            Open
          </Button>
        </Grid>
      </Grid>
      <br />
      <br />
      <Typography variant="body1" gutterBottom>
        {event.description}
      </Typography>
    </div>
  ) : null;
};

export default CategoryPage;
