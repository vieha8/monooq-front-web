import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import Path from 'config/path';
import { Colors } from 'variables';
import { userActions } from 'redux/modules/user';
import { spaceActions } from 'redux/modules/space';
import BaseTemplate from 'components/templates/BaseTemplate';
import withAuthRequire from 'components/hooks/withAuthRequire';
import SpaceManageList from 'components/LV3/SpaceManageList';
import LoadingPage from 'components/LV3/LoadingPage';
import NoneData from 'components/LV2/NoneData';

class SpaceManagementPage extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(userActions.fetchUserSpaces());
  }

  componentDidMount() {
    this.prevBg = document.body.style.background;
    document.body.style.background = Colors.lightGray1Bg;
  }

  componentWillUnmount() {
    document.body.style.background = this.prevBg;
  }

  onClickEdit = space => {
    const { history } = this.props;
    history.push(Path.spaceEdit1(space.id));
  };

  onClickRemove = space => {
    const { dispatch } = this.props;
    dispatch(spaceActions.deleteSpace({ space }));
  };

  getPrices = (priceFull, priceTatami) => {
    const prices = [numeral(priceFull).format('0,0')];
    prices.push(numeral(priceTatami).format('0,0'));
    return prices;
  };

  render() {
    const { isLoading, spaces, history } = this.props;

    if (isLoading) {
      return <LoadingPage />;
    }

    if (!Array.isArray(spaces)) {
      return (
        <BaseTemplate maxWidth={1000}>
          <NoneData
            captionHead="スペース情報の取得に失敗しました。"
            caption="画面を再読み込みするか、時間をおいてから再度アクセスをお願いいたします。"
            buttonText="画面を再読み込みする"
            onClick={() => window.location.reload()}
          />
        </BaseTemplate>
      );
    }

    if (spaces.length === 0) {
      return (
        <BaseTemplate maxWidth={1000}>
          <NoneData
            captionHead="登録したスペースがありません"
            caption="スペースの登録がありません。以下のボタンからスペースを登録して荷物を預る準備をしましょう。"
            buttonText="スペースを登録する"
            onClick={() => history.push(Path.spaceCreate1())}
          />
        </BaseTemplate>
      );
    }
    return (
      <BaseTemplate maxWidth={1000}>
        <SpaceManageList
          spaces={spaces.map(space => ({
            sizeType: space.sizeType,
            image: {
              src: (space.images[0] || {}).imageUrl,
              alt: '',
            },
            address: `${space.address}`,
            content: space.title,
            prices: this.getPrices(space.priceFull, space.priceTatami),
            link: Path.space(space.id),
            status: space.status,
            onClickEdit: () => this.onClickEdit(space),
            onClickRemove: () => this.onClickRemove(space),
          }))}
        />
      </BaseTemplate>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  spaces: state.user.spaces,
  isLoading: state.user.isLoading,
});

export default withAuthRequire(connect(mapStateToProps)(SpaceManagementPage));
