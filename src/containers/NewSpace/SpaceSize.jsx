import React from 'react';
import { Redirect } from 'react-router-dom';
import Path from 'config/path';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import SpaceSize from 'components/NewSpace/page/SpaceSize';
import { init, mapStateToProps } from './common';

class SpaceSizeContainer extends React.Component {
  constructor(props) {
    super(props);
    init(props);
  }

  render() {
    const { ui, match } = this.props;

    if (!ui.space.title) {
      if(match.params.space_id) {
        const spaceId = parseInt(match.params.space_id, 10);
        return <Redirect to={Path.editSpaceInfo(spaceId)} />;
      }
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    return (
      <Page>
        <SpaceSize {...this.props} />
      </Page>
    );
  }
}

export default authConnect(mapStateToProps)(SpaceSizeContainer);
