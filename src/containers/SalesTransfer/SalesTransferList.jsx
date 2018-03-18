import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import Menu from 'containers/Menu';
import SalesTransferList from 'components/SalesTransfer/SalesTransferList';

class SalesTransferListContainer extends Component {
  render() {
    return (
      <Page title="売上・振込申請">
        <Menu />
        <SalesTransferList
          currentSales={27000}
          receivableSales={13000}
          transfers={[
            { transferAt: '2018.01.12', status: '処理中', amount: 12000 },
            { transferAt: '2017.12.12', status: '振込済み', amount: 3000 },
            { transferAt: '2017.10.12', status: '振込済み', amount: 5000 },
          ]}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(SalesTransferListContainer);
