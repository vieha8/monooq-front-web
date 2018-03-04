import React, { Component } from 'react';
import { connect } from 'react-redux';
import HostReview from 'components/Review/HostReview';
import { uiActions } from 'redux/modules/ui';
import { Colors } from 'variables';

class PostHostReviewContainer extends Component {
  componentDidMount = () => {
    document.body.style.background = Colors.lightGray1Bg;
  }

  onClickMenu = (event) => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      menuAnchorDom: event.currentTarget,
    }));
  }

  onCloseMenu = () => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      menuAnchorDom: null,
    }));
  }

  render() {
    const { ui } = this.props;

    return (
      <HostReview
        menu={{
          anchorDom: ui.menuAnchorDom,
          onClickMenu: this.onClickMenu,
          onCloseMenu: this.onCloseMenu,
        }}
        host={{
          name: 'YUKI HASHIDA',
          residence: '東京都',
          profile: 'はじめまして！モノオクホストのYUKIです。大きめの荷物でも柔軟に対応しております、いつでもチャットでご連絡ください！',
        }}
        goodCount={5}
        sosoCount={10}
        badCount={2}
        reviews={[
          {
            userName: 'YUKI HASHIDA',
            postedAt: '2018.01.31 21:04',
            comment: 'とても丁寧にメッセージをくださったので安心して取引ができました！荷物もとてもキレイに管理してくれて嬉しかったです。また来月もよろしくお願いします！',
          },
          {
            userName: 'YUKI HASHIDA',
            postedAt: '2018.01.31 21:04',
            comment: 'とても丁寧にメッセージをくださったので安心して取引ができました！荷物もとてもキレイに管理してくれて嬉しかったです。また来月もよろしくお願いします！',
          },
        ]}
      />
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(PostHostReviewContainer);
