import React from 'react';
import { Page } from 'components/NewSpace/page/Shared';
import AboutPrice from 'components/NewSpace/page/AboutPrice';
import {connect} from "react-redux";
import {uiActions} from "../../redux/modules/ui";
import {spaceActions} from "../../redux/modules/space";

class AboutPriceContainer extends React.Component {

  handleChangeText = ({target}) => {
    const {space} = this.props.ui;
    Object.assign(space, {[target.name]: target.value});
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
        <AboutPrice
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

export default connect(mapStateToProps)(AboutPriceContainer);
