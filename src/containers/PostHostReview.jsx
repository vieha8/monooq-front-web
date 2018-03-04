import React, { Component } from 'react';
import Page from 'components/Page';
import PostHostReview from 'components/Review/PostHostReview';
import UserMenu from 'components/Menu/UserMenu';

class PostHostReviewContainer extends Component {
  render() {
    return (
      <Page title="レビューを投稿する">
        <UserMenu />
        <PostHostReview
          hostName="HASHIDA YUKI"
          hostResidence="東京都"
        />
      </Page>
    );
  }
}

export default PostHostReviewContainer;
