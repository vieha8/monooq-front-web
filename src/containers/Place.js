import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import LocalShippingIcon from 'material-ui-icons/LocalShipping';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import People from 'material-ui-icons/People';

import Dialog from '../components/Dialog';

class Place extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography type="body2" component="p" style={{flex:1}}>1ヶ月あたり ¥20,000</Typography><br/>
            <Dialog />
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
              <TableBody>
                <TableRow>
                  <TableCell type="head">保管場所</TableCell>
                  <TableCell>東京都杉並区高円寺</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell type="head">受取方法</TableCell>
                  <TableCell>
                    配送<LocalShippingIcon/><br/>
                    対面<People />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography type="title" style={{marginTop:5}}>スペースについて</Typography>
            <Typography component="p" style={{marginTop:5}}>
              概要や注意事項的なことをあばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばばば
            </Typography>
          </CardContent>
          <Card>
            <CardHeader
              avatar={
                <Avatar src="https://s3-ap-northeast-1.amazonaws.com/monooq/uploads/user/image/430/thumb_696dd0d4-8a36-4e1c-90e2-aa638dbcbf89.jpg">
                </Avatar>
              }
              title="ホストはMasaya Kudoさん"
              subheader="東京都"
            />
            <CardContent>
              <Typography component="p">
                こんにちは。ご覧いただきありがとうございます。普段はシステム開発の仕事をしています。
                昔バンドをやっていたので、音楽関係で機材置き場に困ってる方などの力になれたら嬉しいです。
                気軽にご相談ください。
              </Typography>
              <Divider className={classes.divider} />
              <Typography type="caption" component="p">
                連絡は常にモノオクを通して行いましょう。
                お支払をお守りするためにも、モノオク以外の場所では決して送金や連絡を行わないようご注意ください。
              </Typography>
            </CardContent>
          </Card>
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
  },
});

export default withStyles(styles)(Place);