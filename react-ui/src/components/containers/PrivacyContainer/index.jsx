import React from 'react';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import Privacy from 'components/LV3/Privacy';

class PrivacyContainer extends React.Component {
  render() {
    return <Privacy />;
  }
}

export default ContentPageStatic(PrivacyContainer);
