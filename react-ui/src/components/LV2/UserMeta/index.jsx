import React from 'react';
import styled from 'styled-components';

import { getDateRelativeLastLogin } from 'helpers/date';
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
    {userMeta && userMeta.replyRate != 0 && (
      <UserMetaRow>
        <UserMetaColTitle>返信率</UserMetaColTitle>
        <UserMetaColBody>{(userMeta.replyRate * 100).toFixed()}%</UserMetaColBody>
      </UserMetaRow>
    )}
    {getDateRelativeLastLogin(user.lastLoginAt).viewText && (
      <UserMetaRow>
        <UserMetaColTitle>最終ログイン</UserMetaColTitle>
        <UserMetaColBody>{getDateRelativeLastLogin(user.lastLoginAt).viewText}</UserMetaColBody>
      </UserMetaRow>
    )}
  </UserMeta>
);
