import React, { Fragment } from 'react';
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

export default ErrorContainer;
