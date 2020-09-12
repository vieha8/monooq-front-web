import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestActions } from 'redux/modules/request';
import BaseTemplate from 'components/templates/BaseTemplate';
import withAuthRequire from 'components/hooks/withAuthRequire';
import LoadingPage from 'components/LV3/LoadingPage';
import Estimate from 'components/LV3/Estimate';

class EstimatePage extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(
      requestActions.fetchRequestTakelateBefore({
        guestId: props.location.state ? props.location.state.guestId : 0,
        spaceId: props.location.state ? props.location.state.spaceId : 0,
      }),
    );
    this.state = {
      priceTatami: props.location.state && props.location.state.priceTatami,
      priceFull: props.location.state && props.location.state.priceFull,
    };
  }

  render() {
    const { user, isSending, isTakelateBefore, isExistEcontext } = this.props;
    const { priceTatami, priceFull } = this.state;

    if (isSending) {
      return <LoadingPage />;
    }

    return (
      <BaseTemplate>
        <Estimate
          userId={user && user.id}
          priceTatami={priceTatami && priceTatami > 0 ? priceTatami : 0}
          priceFull={priceFull && priceFull > 0 ? priceFull : 0}
          isTakelateBefore={isTakelateBefore}
          isExistEcontext={isExistEcontext}
          buttonLoading={false}
        />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isSending: state.request.estimate.isSending,
  isTakelateBefore: state.request.estimate.isTakelateBefore,
  isExistEcontext: state.request.estimate.isExistEcontext,
});

export default withAuthRequire(connect(mapStateToProps)(EstimatePage));
