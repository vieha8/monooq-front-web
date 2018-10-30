import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import StaticPageContent from 'components/atomic/LV1/StaticPageContent';
import Privacy from 'components/Static/Privacy';
import Header from 'components/atomic/containers/Header';

class PrivacyContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <StaticPageContent>
          <Privacy />
        </StaticPageContent>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(PrivacyContainer));
