import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import CancelSchedule from 'components/CancelSchedule';
import UserMenu from 'components/Menu/UserMenu';
import { uiActions } from 'redux/modules/ui';

class HostSpaceListContainer extends Component {
  renderConfirmCancel = () => {
    const { dispatch } = this.props;
    const onClickCancel = () => {
      dispatch(uiActions.setUiState({
        cancelled: true,
      }));
    };

    return (
      <Page
        title="キャンセルする"
        subTitle="預かり開始日の15日前まではキャンセル手数料はかかりません。"
      >
        <UserMenu />
        <CancelSchedule onClickCancel={onClickCancel} confirm />
      </Page>
    );
  }

  renderCancelled = () => {
    return (
      <Page
        title="キャンセルが完了しました"
        subTitle="予定のキャンセルが完了しました。キャンセル手数料を引いた返金処理は数日以内に行われます。"
      >
        <UserMenu />
        <CancelSchedule />
      </Page>
    );
  }

  render() {
    const { ui } = this.props;
    return (
      ui.cancelled
        ? this.renderCancelled()
        : this.renderConfirmCancel()
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(HostSpaceListContainer);
