import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';

const Container = styled.div`
  border-bottom: 1px solid ${Colors.borderGray};
  padding: ${Dimens.medium2}px 0;
`;

const IMAGE_SIZE = 60;
const UserIcon = styled.img`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: ${IMAGE_SIZE / 2}px;
  object-fit: cover;
`;

const UserInfoContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-left: ${Dimens.medium}px;
`;

const UserName = styled.span`
  display: block;
  color: ${Colors.black};
  font-size: ${FontSizes.small}px;
  margin-top: ${Dimens.small}px;
`;

const PostedAt = UserName.extend`
  margin-top: ${Dimens.medium}px;
`;

const Comment = styled.div`
  margin-top: ${Dimens.medium}px;
  color: ${Colors.black};
  font-size: ${FontSizes.small}px;
  line-height: 1.8;
`;

export default props => (
  <Container>
    <div>
      <UserIcon
        src="http://placehold.jp/500x500.png"
        alt={props.userName}
      />
      <UserInfoContainer>
        <UserName>{props.userName} さんからのレビュー</UserName>
        <PostedAt>{props.postedAt}</PostedAt>
      </UserInfoContainer>
    </div>
    <Comment>{props.reviewComment}</Comment>
  </Container>
);
