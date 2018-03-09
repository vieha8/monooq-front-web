import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import UserMenu from 'components/Menu/UserMenu';
import Report from 'components/Report';
import ReportUserOrHost from 'components/Report/UserOrHost';
import ReportCompleted from 'components/Report/Completed';
import { uiActions } from 'redux/modules/ui';

class ReportContainer extends Component {
  onClickSave = () => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      reportCompleted: true,
    }));
  }

  renderReport() {
    return (
      <Page title="不適切な場所を報告">
        <UserMenu />
        <Report
          onClickSave={this.onClickSave}
        />
      </Page>
    );
  }

  renderReportUserOrHost() {
    return (
      <Page title="不適切なユーザー・ホストを報告">
        <UserMenu />
        <ReportUserOrHost
          hostName="YUKI HASHIDA"
          hostArea="東京都"
          onClickSave={this.onClickSave}
        />
      </Page>
    );
  }

  renderReportCompoleted() {
    return (
      <Page title="送信完了しました">
        <UserMenu />
        <ReportCompleted />
      </Page>
    );
  }

  render() {
    const { ui } = this.props;

    // [TODO]ホスト・ユーザー報告画面を出すのかスペース報告画面を出すのかの分岐
    return (
      ui.reportCompleted
        ? this.renderReportCompoleted()
        : this.renderReportUserOrHost()
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(ReportContainer);
