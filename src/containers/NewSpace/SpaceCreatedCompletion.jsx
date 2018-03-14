import React from 'react';
import { Page } from 'components/NewSpace/page/Shared';
import SpaceCratedCompletion from 'components/NewSpace/page/SpaceCreatedCompletion';
import {connect} from "react-redux";

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

export default connect(mapStateToProps)(SpaceCratedCompletionContainer);
