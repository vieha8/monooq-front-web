import React from 'react';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import Insurance from 'components/LV3/Insurance';

class InsuranceContainer extends React.Component {
  render() {
    return <Insurance />;
  }
}

export default ContentPageStatic(InsuranceContainer);
