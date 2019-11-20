import React from 'react';
// import Path from 'config/path';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import Lp123Guest from 'components/LV3/Lp123Guest';

class Lp123GuestContainer extends React.Component {
  render() {
    // const { history } = this.props;
    return (
      <Lp123Guest
      // onClickHowToUse={() => history.push(Path.howtouse())}
      // onClickInsurance={() => history.push(Path.insurance())}
      // onClickRule={() => history.push(Path.rule())}
      />
    );
  }
}

export default ContentPageStatic(Lp123GuestContainer, {
  maxWidth: true,
  bottomMargin: true,
});
