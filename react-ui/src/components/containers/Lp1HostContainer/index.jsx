import React from 'react';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import Lp1Host from 'components/LV3/Lp1Host';

class Lp1HostContainer extends React.Component {
  render() {
    return <Lp1Host />;
  }
}

export default ContentPageStatic(Lp1HostContainer, {
  isLp: true,
  maxWidth: true,
  bottomMargin: true,
});
