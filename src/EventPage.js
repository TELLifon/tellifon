import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

const eventData = {
  name: "Morning Yoga",
  moderator: "Mathis Kretz",
  startdate: "2020-04-04",
  duration: "60",
  description: "Llorem ipsum",
  id: "123",
  is_public: true,
  image_src:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kamalaya.com%2Ffileadmin%2Fuser_upload%2FWELLNESS-PROGRAMS-THAILAND%2Fyoga-thailand-2000x850%2Fyoga-retreats-thailand.jpg&f=1&nofb=1"
};

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
  // const { categoryId } = useParams();
  const classes = useStyles();

  return (
    <div>
      <img
        src={eventData.image_src}
        alt={eventData.name}
        className={classes.heroImage}
      />
      <br />
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h4" gutterBottom>
            {eventData.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} className={classes.actionButtons}>
          <Button
            color="primary"
            variant="outlined"
            component={Link}
            href={`https://schwaf.li/${eventData.id}`}
            target="_blank"
            rel="noopener"
          >
            Open
          </Button>
        </Grid>
      </Grid>
      <br />
      <br />
      <Typography variant="paragraph" gutterBottom>
        {eventData.description}
      </Typography>
    </div>
  );
};

export default CategoryPage;
