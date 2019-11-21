import React, { Fragment } from 'react';
import Path from 'config/path';
import { partialMatch } from 'helpers/string';
import ContentPageStatic from 'components/hocs/ContentPageStatic';
import Lp123Guest from 'components/LV3/Lp123Guest';

const PATH_LP2_GUEST = '/lp2/guest';
const PATH_LP3_GUEST = '/lp3/guest';

class Lp123GuestContainer extends React.Component {
  constructor(props) {
    super(props);
    const targetUrl = props.match ? props.match.url : '';
    this.state = {
      targetUrl,
      titleMeta: '',
      headline: '',
      titleWant: '',
    };
  }

  componentDidMount() {
    const { targetUrl } = this.state;

    let titleMeta =
      'トランクルームより安く荷物を預けるなら『モノオク』｜トランクルーム・コンテナよりもお手軽に収納';
    let headline = this.getHeadlineLp1();
    let titleWant = 'こんな荷物ありませんか？';

    if (partialMatch(targetUrl, PATH_LP2_GUEST)) {
      titleMeta =
        'レンタル倉庫・コンテナより安く荷物を預けるなら「モノオク」｜トランクルーム・コンテナよりもお手軽に収納';
      headline = this.getHeadlineLp2();
      titleWant = '荷物の保管場所に困ってませんか？';
    } else if (partialMatch(targetUrl, PATH_LP3_GUEST)) {
      titleMeta =
        '引っ越し荷物の一時保管を安くするなら「モノオク」｜トランクルーム・コンテナよりもお手軽に収納';
      headline = this.getHeadlineLp3();
      titleWant = '荷物の保管場所に困ってませんか？';
    }

    this.setState({ titleWant, headline, titleMeta });
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
    const { history } = this.props;
    const { titleMeta, headline, titleWant } = this.state;
    return (
      <Lp123Guest
        titleMeta={titleMeta}
        headline={headline}
        titleWant={titleWant}
        onClickSignup={() => history.push(Path.signUp())}
      />
    );
  }
}

export default ContentPageStatic(Lp123GuestContainer, {
  maxWidth: true,
  bottomMargin: true,
});
