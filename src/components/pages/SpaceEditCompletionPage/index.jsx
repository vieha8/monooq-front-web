import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseTemplate from 'components/templates/BaseTemplate';
import SpaceEditCompletion from 'components/LV3/SpaceEdit/Completion';
import withAuthRequire from 'components/hooks/withAuthRequire';

class SpaceEditCompletionPage extends Component {
  render() {
    const { user } = this.props;
    return (
      <BaseTemplate>
        <SpaceEditCompletion userId={user.id} />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default withAuthRequire(connect(mapStateToProps)(SpaceEditCompletionPage));
