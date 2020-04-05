import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./tellifon-white.png";

const useStyles = makeStyles({
  container: {
    flex: 1,
  },
  img: {
    height: 40,
    marginLeft: -12,
    marginTop: -2,
  },
});

const Logo = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Button>
        <img className={classes.img} src={logo} alt="Tellifon" />
      </Button>
    </div>
  );
};

export default Logo;
