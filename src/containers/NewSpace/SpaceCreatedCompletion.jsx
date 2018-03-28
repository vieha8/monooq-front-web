import React from 'react';
import { Redirect } from 'react-router-dom';
import Path from 'config/path';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import SpaceCratedCompletion from 'components/NewSpace/page/SpaceCreatedCompletion';
import { init } from './common';

class SpaceCratedCompletionContainer extends React.Component {
  constructor(props) {
    super(props);
    init(props);
  }

  render() {
    const { ui } = this.props;

    if (!ui.space.title) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    return (
      <Page>
        <SpaceCratedCompletion
          {...this.props}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  let space = state.space.created;
  if (state.space.space) {
    space = state.space.space;
  }
  return ({
    ui: state.ui,
    space,
  });
};


export default authConnect(mapStateToProps)(SpaceCratedCompletionContainer);
