import React from 'react';
import { withStyles } from 'material-ui/styles';
import { defaultPageFactory } from '../components/PageLayouts';

class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.pageTitle = 'メッセージ';
    this.contents = this.contents.bind(this);
  }

  contents() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        test
      </div>
    );
  }

  render() {
    const Page = defaultPageFactory(this.pageTitle, this.contents);
    return <Page />;
  }
  
}

const styles = {

};

export default withStyles(styles)(Messages);