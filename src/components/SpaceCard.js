import React from 'react';
import {Link} from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardContent, CardMedia } from 'material-ui/Card';

class SpaceCard extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Link to="/space/1" style={{textDecoration: 'none'}}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://s3-ap-northeast-1.amazonaws.com/monooq/uploads/place_image/id/267/12dd0fbf-d1c9-4b7f-b243-c45cfbf8fbed.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography type="caption">高円寺</Typography>
              <Typography type="title" component="h2">
                TOKYO DESIGN OFFICE ~ MONOOQ ~
              </Typography>
              <Typography type="subheading" component="h3" style={{paddingTop:5, paddingBottom:5}}>
                ¥20,000/月
              </Typography>
              <Typography type="caption" component="p">
                高円寺駅から徒歩5分、好立地の場所にあります。
                デザイン事務所のマンションの1室、6帖の1室が空いたのでその場所を提供します。
              </Typography>
            </CardContent>
          </Card>
        </Link>
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
  }
});

export default withStyles(styles)(SpaceCard);