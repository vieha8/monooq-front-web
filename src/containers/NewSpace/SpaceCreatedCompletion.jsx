import React from 'react';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import SpaceCratedCompletion from 'components/NewSpace/page/SpaceCreatedCompletion';
import { init } from "./common";

class SpaceCratedCompletionContainer extends React.Component {
  constructor(props) {
    super(props);
    init(props);
  }

  render() {
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
