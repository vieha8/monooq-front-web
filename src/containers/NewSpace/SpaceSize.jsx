import React from 'react';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import SpaceSize from 'components/NewSpace/page/SpaceSize';
import { init, mapStateToProps } from "./common";

class SpaceSizeContainer extends React.Component {
  constructor(props) {
    super(props);
    init(props);
  }

  render() {
    return (
      <Page>
        <SpaceSize {...this.props} />
      </Page>
    );
  }
}

export default authConnect(mapStateToProps)(SpaceSizeContainer);
