import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ja';

import { Colors, Dimens, FontSizes } from 'variables';

const UserMeta = styled.div`
  color: ${Colors.darkGray1};
  font-weight: bold;
  padding: 0 0 ${Dimens.medium}px 0;
`;
const UserMetaTitle = styled.div`
  font-size: ${FontSizes.medium}px;
`;
const UserMetaImageWrap = styled.div`
  padding: ${Dimens.medium}px 0 ${Dimens.xxsmall_4}px 0;
`;
const UserMetaImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
const UserMetaName = styled.div`
  font-size: ${FontSizes.medium1}px;
`;
const UserMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Dimens.xxsmall_4}px 0;
`;
const UserMetaColTitle = styled.div`
  font-size: ${FontSizes.small_15}px;
`;
const UserMetaColBody = styled.div`
  font-size: ${FontSizes.medium2}px;
`;

export default ({ userMeta, user }) => (
  <UserMeta>
    <UserMetaTitle>気になるスペースを見つけたら？</UserMetaTitle>
    <UserMetaTitle>ホストに相談しよう</UserMetaTitle>
    <UserMetaImageWrap>
      <UserMetaImage src={user.imageUrl} />
    </UserMetaImageWrap>
    <UserMetaName>{user.name}</UserMetaName>
    {userMeta && (
      <UserMetaRow>
        <UserMetaColTitle>返信率</UserMetaColTitle>
        <UserMetaColBody>{(userMeta.replyRate * 100).toFixed(1)}%</UserMetaColBody>
      </UserMetaRow>
    )}
    <UserMetaRow>
      <UserMetaColTitle>最終ログイン</UserMetaColTitle>
      <UserMetaColBody>{moment(user.lastLoginAt).fromNow()}</UserMetaColBody>
    </UserMetaRow>
  </UserMeta>
);
