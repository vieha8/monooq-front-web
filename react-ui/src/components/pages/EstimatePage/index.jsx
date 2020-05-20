import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseTemplate from 'components/templates/BaseTemplate';
import withAuthRequire from 'components/hooks/withAuthRequire';
import Estimate from 'components/LV3/Estimate';

class EstimatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceTatami: props.location.state && props.location.state.priceTatami,
      priceFull: props.location.state && props.location.state.priceFull,
    };
  }

  render() {
    const { user, isSending } = this.props;
    const { priceTatami, priceFull } = this.state;
    return (
      <BaseTemplate>
        <Estimate
          userId={user && user.id}
          priceTatami={priceTatami && priceTatami > 0 ? priceTatami : 6000}
          priceFull={priceFull && priceFull > 0 ? priceFull : 6000}
          buttonLoading={isSending}
        />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isSending: state.request.estimate.isSending,
});

export default withAuthRequire(connect(mapStateToProps)(EstimatePage));
