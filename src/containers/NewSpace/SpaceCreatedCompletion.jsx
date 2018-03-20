import React from 'react';
import { authConnect } from "../../components/Auth";
import { Page } from 'components/NewSpace/page/Shared';
import SpaceCratedCompletion from 'components/NewSpace/page/SpaceCreatedCompletion';

class SpaceCratedCompletionContainer extends React.Component {

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

const mapStateToProps = state => ({
  ui: state.ui,
  space: state.space.created,
});

export default authConnect(mapStateToProps)(SpaceCratedCompletionContainer);
