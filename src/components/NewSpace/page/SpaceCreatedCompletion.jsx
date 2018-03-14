import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';
import { Container, PageContent } from './Shared';
import Header from '../shared/Header';
import Title from '../shared/Title';
import Button, { ButtonsContainer } from '../shared/Button';
import SideBar from '../shared/SideBar';
import MySpaceRow from '../shared/MySpaceRow';

const SpaceListTitle = styled.span`
  dipslay: block;
  color: ${Colors.darkGray1};
  font-size: ${FontSizes.medium}px;
`;

const SpaceListWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

export default (props) => (
  <Container>
    <PageContent>
      <Header
        header="スペースの登録が完了しました！"
      />
      <Title
        title="ユーザーからの相談を待ちましょう。安心してもらえるようにメッセージは素早い対応を心がけましょう！"
      />
      <ButtonsContainer>
        <Button wide width={220} onClick={() => {
          console.log(props);
          props.history.push(`/space/${props.space.ID}`);
        }}>登録したスペースを見る</Button>
      </ButtonsContainer>
    </PageContent>
    <SideBar
      renderMainContent={() => (
        <div>
          <SpaceListTitle>登録済みのスペース</SpaceListTitle>
          <SpaceListWrapper>
            <MySpaceRow place="東京都" title="東京タワーにも近くて便利！大きい荷物も何人分でもOK大きい荷物も何人分でもOK大きい荷物も何人分でもOK大きい荷物も何人分でもOK" />
          </SpaceListWrapper>
        </div>
      )}
    />
  </Container>
);
