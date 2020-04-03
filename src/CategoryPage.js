import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const categoryData = {
  id: "",
  icon: "cafe_local",
  label: "Indoor Sports",
  events: [
    {
      name: "Morning Yoga",
      moderator: "Mathis Kretz",
      startdate: "2020-04-04",
      duration: "60",
      description: "Llorem ipsum",
      id: "123",
      is_public: true,
      image_src:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kamalaya.com%2Ffileadmin%2Fuser_upload%2FWELLNESS-PROGRAMS-THAILAND%2Fyoga-thailand-2000x850%2Fyoga-retreats-thailand.jpg&f=1&nofb=1"
    },
    {
      name: "Push-ups",
      moderator: "Mathis Kretz",
      startdate: "2020-04-05",
      duration: "30",
      description: "Llorem ipsum",
      id: "234",
      is_public: true,
      image_src:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kamalaya.com%2Ffileadmin%2Fuser_upload%2FWELLNESS-PROGRAMS-THAILAND%2Fyoga-thailand-2000x850%2Fyoga-retreats-thailand.jpg&f=1&nofb=1"
    },
    {
      name: "Gymnastics",
      moderator: "",
      startdate: "2020-04-04",
      duration: "45",
      description: "Llorem ipsum",
      id: "345",
      is_public: true,
      image_src:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kamalaya.com%2Ffileadmin%2Fuser_upload%2FWELLNESS-PROGRAMS-THAILAND%2Fyoga-thailand-2000x850%2Fyoga-retreats-thailand.jpg&f=1&nofb=1"
    },
    {
      name: "Dance",
      moderator: "Mathis Kretz",
      startdate: "2020-04-06",
      duration: "15",
      description: "Llorem ipsum",
      id: "456",
      is_public: true,
      image_src:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kamalaya.com%2Ffileadmin%2Fuser_upload%2FWELLNESS-PROGRAMS-THAILAND%2Fyoga-thailand-2000x850%2Fyoga-retreats-thailand.jpg&f=1&nofb=1"
    }
  ]
};

const useStyles = makeStyles({
  media: {
    height: 140
  }
});

const CategoryPage = () => {
  // const { categoryId } = useParams();
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {categoryData.label}
      </Typography>
      <br />
      <br />
      <Grid container spacing={3}>
        {categoryData.events.map(e => (
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Card>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={e.image_src}
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
                    {e.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CategoryPage;
