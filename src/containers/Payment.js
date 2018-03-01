import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { DialogContentText } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSending: false,
    };
  }

  componentWillMount() {
    // TODO ちょっと魔改造感あるから他のやり方ないか検証したい
    const script = document.createElement('script');
    script.src = 'http://localhost:3000/omise.js';
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.payment}>
        <DialogContentText id="alert-dialog-slide-description">
          VISA、Mastercard、JCB、Diners
          Club、AMEXのクレジットカードもしくはデビットカードがご利用いただけます。
        </DialogContentText>
        <br />
        <form id="checkout-form" method="post" action="">
          <input type="hidden" name="omiseToken" />

          <TextField
            id="nameOnCard"
            label="カード名義"
            type="text"
            className={classes.textField}
            value="Tarou Tanaka"
          />

          <TextField
            id="cardNumber"
            label="カード番号"
            type="text"
            className={classes.textField}
            value="4242424242424242"
          />

          <TextField
            id="expiryYear"
            label="有効期限(年)"
            type="text"
            className={classes.textField}
            value="2018"
          />

          <TextField
            id="expiryMonth"
            label="有効期限(月)"
            type="text"
            className={classes.textField}
            value="12"
          />

          <TextField
            id="securityCode"
            label="セキュリティコード"
            type="text"
            className={classes.textField}
            value="222"
          />
          <br />
          <br />
          <div style={{ textAlign: 'center' }}>
            <Button raised type="submit" color="primary">
              送信
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const styles = () => ({
  payment: {
    width: '300px',
    margin: '0 auto',
  },
  textField: {
    width: '100%',
    marginTop: 10,
  },
});

export default withStyles(styles)(Payment);
