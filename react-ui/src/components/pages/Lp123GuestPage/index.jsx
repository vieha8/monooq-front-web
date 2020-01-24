import React, { Fragment } from 'react';
import Path from 'config/path';
import { partialMatch } from 'helpers/string';
import Lp123Guest from 'components/LV3/Lp123Guest';

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
    };
  }

  componentDidMount() {
    const { targetUrl } = this.state;

    let titleMeta =
      'トランクルームより安く荷物を預けるなら『モノオク』｜トランクルーム・コンテナよりもお手軽に収納';
    let headline = this.getHeadlineLp1();
    let titleWant = 'こんな荷物ありませんか？';
    let buttonLink = Path.signUp();

    if (partialMatch(targetUrl, Path.lp2Guest()) || partialMatch(targetUrl, Path.lp2Guest2())) {
      titleMeta =
        'レンタル倉庫・コンテナより安く荷物を預けるなら「モノオク」｜トランクルーム・コンテナよりもお手軽に収納';
      headline = this.getHeadlineLp2();
      titleWant = '荷物の保管場所に困ってませんか？';
    } else if (partialMatch(targetUrl, Path.lp3Guest())) {
      titleMeta =
        '引っ越し荷物の一時保管を安くするなら「モノオク」｜トランクルーム・コンテナよりもお手軽に収納';
      headline = this.getHeadlineLp3();
      titleWant = '荷物の保管場所に困ってませんか？';
    }
    if (partialMatch(targetUrl, Path.lp1Guest2()) || partialMatch(targetUrl, Path.lp2Guest2())) {
      buttonLink = Path.top();
    }
    this.setState({ titleWant, headline, titleMeta, buttonLink });
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
    const { titleMeta, headline, titleWant, buttonLink } = this.state;
    return (
      <Lp123Guest
        titleMeta={titleMeta}
        headline={headline}
        titleWant={titleWant}
        buttonLink={buttonLink}
      />
    );
  }
}

export default Lp123GuestPage;
