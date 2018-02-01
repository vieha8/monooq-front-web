import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Table, { TableCell, TableRow } from 'material-ui/Table';
import LocalShipping from 'material-ui-icons/LocalShipping';
import People from 'material-ui-icons/People';

class Place extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography type="body2" component="p" style={{flex:1}}>1ヶ月あたり ¥20,000</Typography><br/>
            <Button raised color="secondary">リクエスト</Button>
          </Toolbar>
        </AppBar>
        <Card className={classes.card}>
          <CardContent>
            <Typography type="caption">高円寺</Typography>
            <Typography type="title" component="p">
              TOKYO DESIGN OFFICE ~ MONOOQ ~
            </Typography>
          </CardContent>
          <CardMedia
            className={classes.media}
            image="https://s3-ap-northeast-1.amazonaws.com/monooq/uploads/place_image/id/267/12dd0fbf-d1c9-4b7f-b243-c45cfbf8fbed.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography component="p">
              高円寺駅から徒歩5分、好立地の場所にあります。
              デザイン事務所のマンションの1室、6帖の1室が空いたのでその場所を提供します。
            </Typography>
            <Divider className={classes.divider} />
            <Table>
              <TableRow>
                <TableCell type="head">保管場所</TableCell>
                <TableCell type="body">東京都杉並区高円寺</TableCell>
              </TableRow>
              <TableRow style={{verticalAlign: 'middle'}}>
                <TableCell type="head">受取方法</TableCell>
                <TableCell type="body">
                  配送<LocalShipping /><br/>
                  対面<People />
                </TableCell>
              </TableRow>
            </Table>
            <Divider className={classes.divider} />
            <Typography component="p">
              注意事項的なことをあばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばば
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    margin: 20,
    marginTop: 80,
  },
  media: {
    height: 200,
    maxWidth: 300,
    margin: 'auto'
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  }
});

export default withStyles(styles)(Place);