import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import HostMenu from 'components/Menu/HostMenu';
import EditBankAccount from 'components/SalesTransfer/EditBankAccount';
import { uiActions } from 'redux/modules/ui';

class UnsubscribeContainer extends Component {
  onClickConfirmButton = () => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      confirm: true,
      bankName: 'モノオク銀行',
      branchName: 'モノオク支店',
      accountType: '普通',
      accountNumber: '12345678',
      accountLastName: 'ほげほげ',
      accountFirstName: 'ふがふが',
    }));
  }

  onClickUpdateBankAccount = () => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      updated: true,
    }));
  }

  onClickToRequestTransfer = () => {

  }

  renderUpdated() {
    return (
      <Page title="振込口座情報を登録しました。" subTitle="※振込申請は3000円以上から可能です">
        <HostMenu />
        <EditBankAccount
          updated
          onClickToRequestTransfer={this.onClickToRequestTransfer}
        />
      </Page>
    );
  }

  render() {
    const { ui } = this.props;

    if (ui.updated) {
      return this.renderUpdated();
    }

    return (
      <Page title={ui.confirm ? '振込口座情報の確認' : '口座情報を登録する'} subTitle="※振込申請は3000円以上から可能です">
        <HostMenu />
        <EditBankAccount
          {...ui}
          onClickConfirmButton={this.onClickConfirmButton}
          onClickUpdateBankAccount={this.onClickUpdateBankAccount}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(UnsubscribeContainer);
