import React, { Fragment } from 'react';
import Path from 'config/path';
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
    };
  }

  componentDidMount() {
    const { targetUrl } = this.state;

    let headline = this.getHeadlineLp1();
    let titleWant = 'こんな荷物ありませんか？';

    switch (targetUrl) {
      case PATH_LP2_GUEST:
        headline = this.getHeadlineLp2();
        titleWant = '荷物の保管場所に困ってませんか？';
        break;
      case PATH_LP3_GUEST:
        headline = this.getHeadlineLp3();
        titleWant = '荷物の保管場所に困ってませんか？';
        break;
      default:
    }

    this.setState({ titleWant, headline });
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
    const { titleWant, headline } = this.state;
    return (
      <Lp123Guest
        onClickSignup={() => history.push(Path.signUp())}
        titleWant={titleWant}
        headline={headline}
      />
    );
  }
}

export default ContentPageStatic(Lp123GuestContainer, {
  maxWidth: true,
  bottomMargin: true,
});
