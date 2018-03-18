import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routes } from 'config/routes';
import Page from 'components/Page';
import Menu from 'containers/Menu';
import TransferRequest from 'components/SalesTransfer/TransferRequest';
import { uiActions } from 'redux/modules/ui';

class TransferRequestContainer extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      salesAmount: 24500,
      receivableAmount: 2000,
      bankName: 'モノオク銀行',
      branchName: 'モノオク支店',
      accountType: '普通',
      accountNumber: '12345678',
      accountLastName: 'ほげほげ',
      accountFirstName: 'ふがふが',
    }));
  }

  onClickTransferRequest = () => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      requested: true,
    }));
  }

  onClickToSalesTransferList = () => {
    const { history } = this.props;
    history.push(routes.salesTransferList.path);
  }

  renderTransferRequested() {
    const { ui } = this.props;
    return (
      <Page title="振込申請が完了しました" subTitle="通常3,4営業日以内にお振込があります。">
        <Menu />
        <TransferRequest
          {...ui}
          requested
          onClickToSalesTransferList={this.onClickToSalesTransferList}
        />
      </Page>
    );
  }

  render() {
    const { ui } = this.props;

    if (ui.requested) {
      return this.renderTransferRequested();
    }

    return (
      <Page title="振込申請" subTitle="取引が終了した売上合計の振込を申請できます。">
        <Menu />
        <TransferRequest
          {...ui}
          onClickTransferRequest={this.onClickTransferRequest}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(TransferRequestContainer);
