import React from 'react';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import Insurance from 'components/LV3/Insurance';

class InsurancePage extends React.Component {
  render() {
    return <Insurance />;
  }
}

export default ContentPageStatic(InsurancePage);
