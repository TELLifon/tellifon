import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import CategoryPage from "./CategoryPage";
import HomePage from "./HomePage";
import EventPage from "./EventPage";
import "./App.css";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
  },
  languageButton: {
    color: "white",
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChoice = (lang) => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(
        (result) => {
          setCategories(result);
        },
        (error) => {
          console.error(error);
        }
      );
  }, []);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {categories.map((c) => (
          <ListItem
            button
            key={c.id}
            component={NavLink}
            to={`/categories/${c.id}`}
          >
            <ListItemIcon>
              <Icon>{c.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={c.label.en} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Grid
              justify="space-between" // Add it here :)
              container
              spacing={24}
            >
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  Tellifon
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  className={classes.languageButton}
                >
                  {t("main.language.title")}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleLanguageChoice("en")}>
                    English
                  </MenuItem>
                  <MenuItem onClick={() => handleLanguageChoice("de")}>
                    Deutsch
                  </MenuItem>
                  <MenuItem onClick={() => handleLanguageChoice("fr")}>
                    Francais
                  </MenuItem>
                  <MenuItem onClick={() => handleLanguageChoice("it")}>
                    Italiano
                  </MenuItem>
                  <MenuItem onClick={() => handleLanguageChoice("rm")}>
                    Rumantsch
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClick={handleDrawerToggle}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/categories/:categoryId">
              <CategoryPage />
            </Route>
            <Route path="/events/:eventId">
              <EventPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default ResponsiveDrawer;
