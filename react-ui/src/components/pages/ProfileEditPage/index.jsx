import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from 'redux/modules/user';
import BaseTemplate from 'components/templates/BaseTemplate';
import { withAuthRequire, withHandleBeforeUnload } from 'components/hooks';
import ProfileEdit from 'components/LV3/ProfileEdit';
import ProfileEditCompleted from 'components/LV3/ProfileEdit/Completed';

class ProfileEditPage extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(userActions.prepareUpdateUser());
  }

  render() {
    const { updateSuccess, user, errMessage, isLoading } = this.props;

    if (!updateSuccess) {
      return (
        <BaseTemplate>
          <ProfileEdit user={user} errMessage={errMessage} buttonLoading={isLoading} />
        </BaseTemplate>
      );
    }

    window.scrollTo(0, 0);
    return (
      <BaseTemplate>
        <ProfileEditCompleted userId={user.id} />
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
