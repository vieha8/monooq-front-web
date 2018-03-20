import React from 'react';
import { authConnect } from "../../components/Auth";
import { Page } from 'components/NewSpace/page/Shared';
import SpaceCratedCompletion from 'components/NewSpace/page/SpaceCreatedCompletion';
import {uiActions} from "../../redux/modules/ui";
import {spaceActions} from "../../redux/modules/space";

class SpaceCratedCompletionContainer extends React.Component {

  constructor(props){
    super(props);
    if(props.match.params.space_id){
      const spaceId = parseInt(props.match.params.space_id, 10);
      this.props.dispatch(uiActions.setUiState({
        spaceId,
        isEdit: true,
      }));
      this.props.dispatch(spaceActions.fetchSpace({spaceId}));
    }
  }

  render() {
    return (
      <Page>
        <SpaceCratedCompletion
          {...this.props}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  let space = state.space.created;
  if(state.space.space){
    space = state.space.space;
  }
  return ({
    ui: state.ui,
    space: space,
  });
};


export default authConnect(mapStateToProps)(SpaceCratedCompletionContainer);
