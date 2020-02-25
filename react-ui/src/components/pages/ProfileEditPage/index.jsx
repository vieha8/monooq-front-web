import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseTemplate from 'components/templates/BaseTemplate';
import { withAuthRequire, withHandleBeforeUnload } from 'components/hooks';
import ProfileEdit from 'components/LV3/ProfileEdit';
import ProfileEditCompleted from 'components/LV3/ProfileEdit/Completed';

class ProfileEditPage extends Component {
  render() {
    const { updateSuccess, user, errMessage, isLoading } = this.props;
    if (updateSuccess) {
      return (
        <BaseTemplate>
          <ProfileEditCompleted userId={user.id} />
        </BaseTemplate>
      );
    }
    return (
      <BaseTemplate>
        <ProfileEdit user={user} errMessage={errMessage} buttonLoading={isLoading} />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user || {},
  updateSuccess: state.user.updateSuccess,
  isLoading: state.user.isLoading,
  errMessage: state.user.errMessage,
  redirectPath: state.ui.redirectPath,
});

export default withAuthRequire(withHandleBeforeUnload(connect(mapStateToProps)(ProfileEditPage)));
