import React, { Fragment } from 'react';
import Path from 'config/path';
import { partialMatch } from 'helpers/string';
import Lp123Guest from 'components/LV3/Lp123Guest';
import BaseLayout from 'components/Layout';

class Lp123GuestPage extends React.Component {
  constructor(props) {
    super(props);
    const targetUrl = props.match ? props.match.url : '';
    this.state = {
      targetUrl,
      titleMeta: '',
      headline: '',
      titleWant: '',
      buttonLink: '',
      isViewPrefuctureList: false,
    };
  }

  componentDidMount() {
    const { targetUrl } = this.state;

    let titleMeta =
      'トランクルームより安く荷物を預けるなら『モノオク』｜トランクルーム・コンテナよりもお手軽に収納';
    let headline = this.getHeadlineLp1();
    let titleWant = 'こんな荷物ありませんか？';
    let buttonLink = Path.signUp();
    let isViewPrefuctureList = false;

    if (
      partialMatch(targetUrl, Path.lp2Guest()) ||
      partialMatch(targetUrl, Path.lp2Guest2()) ||
      partialMatch(targetUrl, Path.lp2Guest3())
    ) {
      titleMeta =
        'レンタル倉庫・コンテナより安く荷物を預けるなら「モノオク」｜トランクルーム・コンテナよりもお手軽に収納';
      headline = this.getHeadlineLp2();
      titleWant = '荷物の保管場所に困ってませんか？';
    } else if (
      partialMatch(targetUrl, Path.lp3Guest()) ||
      partialMatch(targetUrl, Path.lp3Guest3())
    ) {
      titleMeta =
        '引っ越し荷物の一時保管を安くするなら「モノオク」｜トランクルーム・コンテナよりもお手軽に収納';
      headline = this.getHeadlineLp3();
      titleWant = '荷物の保管場所に困ってませんか？';
    }
    if (partialMatch(targetUrl, Path.lp1Guest2()) || partialMatch(targetUrl, Path.lp2Guest2())) {
      buttonLink = Path.top();
    }
    if (
      partialMatch(targetUrl, Path.lp1Guest3()) ||
      partialMatch(targetUrl, Path.lp2Guest3()) ||
      partialMatch(targetUrl, Path.lp3Guest3())
    ) {
      isViewPrefuctureList = true;
    }
    this.setState({ titleWant, headline, titleMeta, buttonLink, isViewPrefuctureList });
  }

  getHeadlineLp1 = () => {
    return (
      <Fragment>
        トランクルームより安く荷物を
        <br />
        預けるなら『モノオク』
      </Fragment>
    );
  };

  getHeadlineLp2 = () => {
    return (
      <Fragment>
        レンタル倉庫・コンテナより
        <br />
        安く荷物を預けるなら『モノオク』
      </Fragment>
    );
  };

  getHeadlineLp3 = () => {
    return (
      <Fragment>
        引っ越し荷物の一時保管を
        <br />
        安くするなら「モノオク」
      </Fragment>
    );
  };

  render() {
    const { titleMeta, headline, titleWant, buttonLink, isViewPrefuctureList } = this.state;
    return (
      <BaseLayout title={titleMeta} noindex>
        <Lp123Guest
          headline={headline}
          titleWant={titleWant}
          buttonLink={buttonLink}
          isViewPrefuctureList={isViewPrefuctureList}
        />
      </BaseLayout>
    );
  }
}

export default Lp123GuestPage;
