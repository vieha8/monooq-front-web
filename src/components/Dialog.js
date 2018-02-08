import React from 'react';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

export const createDialog = (title, ButtonComponent, ContentsComponent) => {
  const transition = props => <Slide direction="up" {...props} />;

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
      };
    }

    handleClickOpen = () => {
      this.setState({ isOpen: true });
    };

    handleClose = () => {
      this.setState({ isOpen: false });
    };

    render() {
      return (
        <div>
          <ButtonComponent onClick={this.handleClickOpen} />
          <Dialog
            open={this.state.isOpen}
            transition={transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
              <ContentsComponent handleClose={this.handleClose} />
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  };
};
