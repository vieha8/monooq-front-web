import React from 'react';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Title from '../shared/Title';
import Button, { ButtonsContainer } from '../shared/Button';

const title = (isEdit) => isEdit ? '編集': '登録';

export default class SpaceCreatedCompletion extends React.Component {

  componentDidMount() {
    if (!this.props.ui.isEdit) {
      const script = document.createElement('script');

      script.innerHTML = `var __atw = __atw || [];
    __atw.push({ "merchant" : "monooq", "param" : {
        "result_id" : "101",
        "verify" : "host_register_${this.props.space.UserID}",
    }});
(function(a){var b=a.createElement("script");b.src="https://h.accesstrade.net/js/nct/cv.min.js";b.async=!0;
a=a.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})(document);`;

      document.body.appendChild(script);
    }
  }

  render() {
    const props = this.props;
    return (
      <Container>
        <PageContent>
          <Header
            header={`スペースの${title(props.ui.isEdit)}が完了しました！`}
          />
          <Title
            title="ユーザーからの相談を待ちましょう。安心してもらえるようにメッセージは素早い対応を心がけましょう！"
          />
          {props.space ?
            <ButtonsContainer>
              <Button wide width={240} onClick={() => {
                props.history.push(`/space/${props.space.ID}`);
              }}>{title(props.ui.isEdit)}したスペースを見る</Button>
            </ButtonsContainer>
            : null}
        </PageContent>
      </Container>
    );
  }
}