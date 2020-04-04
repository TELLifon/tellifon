import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link as RouterLink, useParams } from "react-router-dom";
import defaultImage from "./default-image.jpeg";
import CreateEventDialog from "./CreateEventDialog";

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
}));

const CategoryPage = () => {
  const { categoryId } = useParams();
  const classes = useStyles();
  const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(`/api/categories/${categoryId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setCategory(result);
        },
        (error) => {
          console.error(error);
        }
      );
  }, [categoryId]);

  return category ? (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h4" gutterBottom>
            {category.label}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} className={classes.actionButtons}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              setIsCreateEventDialogOpen(true);
            }}
          >
            Create Meeting
          </Button>
          <Button
            color="primary"
            variant="outlined"
            className={classes.actionButton}
            onClick={() => {
              setIsCreateEventDialogOpen(true);
            }}
          >
            Create Live Stream
          </Button>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={3}>
        {category.events.map((e) => (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={e.id}>
            <Card>
              <CardActionArea component={RouterLink} to={`/events/${e.id}`}>
                <CardMedia
                  className={classes.media}
                  image={e.image_src || defaultImage}
                  title={e.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {e.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {new Date(e.starttime).toLocaleDateString()} at{" "}
                    {new Date(e.starttime).toLocaleTimeString()}
                  </Typography>
                  <br />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {e.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <CreateEventDialog
        isOpen={isCreateEventDialogOpen}
        categoryId={categoryId}
        handleClose={() => {
          setIsCreateEventDialogOpen(false);
        }}
      />
    </div>
  ) : null;
};

export default CategoryPage;
