import React from 'react';
import { withStyles } from 'material-ui/styles';
import Header from './Header/';
import Typography from 'material-ui/Typography';

function createOneColumnPageLayout(title, WrappedComponent) {
  return class extends React.Component {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Header />
          <div className={classes.wrapper}>
            <Typography type="title" component="h2" className={classes.title}>
              {title}
            </Typography>
            <WrappedComponent {...this.props} />
          </div>
        </div>
      );
    }
  };
}

// TODO 2カラム

export const defaultPageFactory = (title, component) => {
  const styles = {
    title: {
      margin: 20,
    },
    wrapper: {
      maxWidth: 720,
      margin: 'auto',
    },
  };
  return withStyles(styles)(createOneColumnPageLayout(title, component));
};
