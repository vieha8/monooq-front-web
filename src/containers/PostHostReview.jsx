import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Path from 'config/path';
import Page from 'components/Page';
import PostHostReview from 'components/Review/PostHostReview';
import Menu from 'containers/Menu';
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

  onClickPostReview = () => {
    const { history } = this.props;
    history.push(Path.profile('user_id_test'));
  }

  render() {
    const { ui } = this.props;

    return (
      <Page title="レビューを投稿する">
        <Menu />
        <PostHostReview
          hostName="HASHIDA YUKI"
          hostResidence="東京都"
          evaluate={ui.evaluate}
          onClickEvaluate={this.onClickEvaluate}
          onClickPostReview={this.onClickPostReview}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default withRouter(connect(mapStateToProps)(PostHostReviewContainer));
