import React from 'react';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Title from '../shared/Title';
import Button, { ButtonsContainer } from '../shared/Button';

const title = (isEdit) => isEdit ? '編集': '登録';

export default (props) => (
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
          <Button wide width={220} onClick={() => {
            props.history.push(`/space/${props.space.ID}`);
          }}>{title(props.ui.isEdit)}したスペースを見る</Button>
        </ButtonsContainer>
        : null}
    </PageContent>
  </Container>
);
