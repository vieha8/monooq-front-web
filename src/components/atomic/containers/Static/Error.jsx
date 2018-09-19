import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import StaticPageContent from 'components/atomic/LV1/StaticPageContent';
import Error from 'components/Static/Error';
import Header from 'components/atomic/containers/Header';

class ErrorContainer extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <StaticPageContent>
          <Error {...this.props} />
        </StaticPageContent>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.api.error,
});

export default withRouter(connect(mapStateToProps)(ErrorContainer));
