import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import tellifonLogo from "./tellifon.png";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: theme.spacing(70),
  },
  logo: {
    maxHeight: theme.spacing(20),
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <Typography variant="h4" gutterBottom>
        {t("home.title")}
      </Typography>
      <br />
      <img src={tellifonLogo} className={classes.logo} alt="Tellifon logo" />
      <br />
      <br />
      <Typography>{t("home.text")}</Typography>
      <br />
      <Typography>{t("home.get-started")}</Typography>
    </div>
  );
};

export default HomePage;
