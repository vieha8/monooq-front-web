import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import About from 'components/Static/About';

class AboutContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <About />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(AboutContainer));
