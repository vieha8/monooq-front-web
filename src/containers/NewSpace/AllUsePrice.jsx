import React from 'react';
import { authConnect } from "../../components/Auth";
import { Page } from 'components/NewSpace/page/Shared';
import AllUsePrice from 'components/NewSpace/page/AllUsePrice';
import {uiActions} from "../../redux/modules/ui"
import { spaceActions } from "../../redux/modules/space";

class AllUsePriceContainer extends React.Component {

  handleChangeText = ({target}) => {
    const {space} = this.props.ui;
    Object.assign(space, {[target.name]: parseInt(target.value, 10)});
    this.props.dispatch(uiActions.setUiState({space}));
  };

  onClickComplete = () => {
    const {space} = this.props.ui;
    space.userId = this.props.user.ID;
    this.props.dispatch(spaceActions.createSpace({body: space}));
  };

  render() {
    return (
      <Page>
        <AllUsePrice
          {...this.props}
          handleChangeText={this.handleChangeText}
          onClickComplete={this.onClickComplete}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  user: state.auth.user,
});

export default authConnect(mapStateToProps)(AllUsePriceContainer);
