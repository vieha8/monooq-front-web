import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import PostHostReview from 'components/Review/PostHostReview';
import UserMenu from 'components/Menu/UserMenu';
import { uiActions } from 'redux/modules/ui';

class PostHostReviewContainer extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      evaluate: null,
    }));
  }

  onClickEvaluate = (selectEvaluate) => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      evaluate: selectEvaluate,
    }));
  }

  render() {
    const { ui } = this.props;

    return (
      <Page title="レビューを投稿する">
        <UserMenu />
        <PostHostReview
          hostName="HASHIDA YUKI"
          hostResidence="東京都"
          evaluate={ui.evaluate}
          onClickEvaluate={this.onClickEvaluate}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(PostHostReviewContainer);
