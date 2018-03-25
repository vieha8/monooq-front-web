import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Loader } from 'semantic-ui-react';
import { Dimens } from 'variables';
import { ContentContainer } from 'components/Page';
import { media } from 'helpers/style/media-query';
import ListItem from './ListItem';
import RegistButton from './RegistButton';

const Empty = styled.div`
  line-height: 1.5;
  ${media.phone`
    padding: 0 ${Dimens.medium}px;
  `}
`;

const Content = styled.div`
  margin-top: -${Dimens.medium2}px;
  margin-left: -${Dimens.medium2}px;
  ${media.phone`
    margin: 0;
  `}
`;

export default props => (
  <ContentContainer>
    <Content>
      {props.isLoading ? (
        <Loader active inline="centered" size="medium">読み込み中...</Loader>
      ) : (
        <Fragment>
          {(props.spaces.length === 0) ? <Empty>スペース登録はまだありません。余っているスペースをお持ちなら、ぜひ登録してみてください！</Empty> : null}
          {props.spaces.map((space, i) => (
            <ListItem key={i} space={space} history={props.history} />
          ))}

        </Fragment>
      )}
    </Content>
    <RegistButton {...props} />
  </ContentContainer>
);
