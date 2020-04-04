import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.spacing(70),
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Welcome to Tellifon!
      </Typography>
      <br />
      <Typography>
        Tellifon is a service that allows you to anonymously and securely share
        your skills, have a casual chat with friends or an important company
        meeting. We are hosted entirely in Switzerland, end to end encrypted and
        officialy William Tell approved.
      </Typography>
      <br />
      <Typography>
        To get started, simply choose one of the categories on the left and join
        an existing event or create your own.
      </Typography>
    </div>
  );
};

export default HomePage;
