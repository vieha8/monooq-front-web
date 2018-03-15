import React from 'react';
import { connect } from 'react-redux';
import { Page } from 'components/NewSpace/page/Shared';
import SpaceInfo from 'components/NewSpace/page/SpaceInfo';
import {uiActions} from "../../redux/modules/ui";

class SpaceInfoContainer extends React.Component {

  handleChangeText = ({target}) => {
    const {space} = this.props.ui;
    Object.assign(space, {[target.name]: target.value});
    this.props.dispatch(uiActions.setUiState({space}));
  };

  handleChangeSelect = (_, target) => {
    this.handleChangeText({target});
  };

  handleChangeImage = (accepted, rejected) => {
    if(rejected.length > 0){
      console.error(rejected);
    }
    if(accepted.length > 4) {
      return;
    }
    const {space} = this.props.ui;
    Object.assign(space, {images: [...space.images, ...accepted]});
    this.props.dispatch(uiActions.setUiState({space}));
  };

  render() {
    return (
      <Page>
        <SpaceInfo
          {...this.props}
          handleChangeText={this.handleChangeText}
          handleChangeSelect={this.handleChangeSelect}
          handleChangeImage={this.handleChangeImage}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(SpaceInfoContainer);
