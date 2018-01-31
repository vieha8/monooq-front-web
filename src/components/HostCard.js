import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

class HostCard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="https://s3-ap-northeast-1.amazonaws.com/monooq/uploads/place_image/id/267/12dd0fbf-d1c9-4b7f-b243-c45cfbf8fbed.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography className={classes.title}>高円寺</Typography>
            <Typography type="headline" component="h2">
              TOKYO DESIGN OFFICE ~ MONOOQ ~
            </Typography>
            <br/>
            <Typography component="p">
              高円寺駅から徒歩5分、好立地の場所にあります。
              デザイン事務所のマンションの1室、6帖の1室が空いたのでその場所を提供します。
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const styles = theme => ({
  card: {
    maxWidth: 300,
    margin: 10
  },
  media: {
    height: 200,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
});

export default withStyles(styles)(HostCard);