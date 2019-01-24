// @flow

import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import StaticPageContent from 'components/atomic/LV1/StaticPageContent';
import Rule from 'components/atomic/LV3/Rule';
import Header from 'components/atomic/containers/Header';

class RuleContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <StaticPageContent>
          <Rule />
        </StaticPageContent>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(RuleContainer));
