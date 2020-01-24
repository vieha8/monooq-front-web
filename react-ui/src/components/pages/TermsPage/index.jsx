import React from 'react';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import Terms from 'components/LV3/Terms';

class TermsPage extends React.Component {
  render() {
    return <Terms />;
  }
}

export default ContentPageStatic(TermsPage);
