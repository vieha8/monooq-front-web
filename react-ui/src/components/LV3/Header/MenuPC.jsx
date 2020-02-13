import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PopupMenu from 'reactjs-popup';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';
import InfoUser from '../../LV2/InfoUser';
import MenuItem from '../../LV2/Items/MenuItem';
import Path from '../../../config/path';
import AvatarIcon from '../../LV2/ButtonHeader/AvatarIcon';
import InlineText from '../../LV1/Texts/InlineText';
import { Colors, Dimens, FontSizes } from '../../../variables';

// TODO styled-componentをViewと統一する
const ActionCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  max-width: 300px;
  &:not(:last-child) {
    padding-right: ${Dimens.medium}px;
  }
  ${props =>
    props.hide &&
    `
    display: none;
  `};
  ${props =>
    !props.noCursol &&
    `
    cursor: pointer;
  `};
`;

const TitleMenu = styled.div`
  padding-left: ${Dimens.medium_20}px;
  font-size: ${FontSizes.small_12}px;
  font-weight: 500;
  line-height: ${Dimens.medium_18}px;
  color: ${Colors.darkGray3};
`;

const trigger = imageUrl => (
  <div>
    <ActionCell>
      <AvatarIcon imageSrc={imageUrl} />
    </ActionCell>
    <ActionCell>
      <InlineText.Base bold>マイページ</InlineText.Base>
    </ActionCell>
  </div>
);

const MenuPC = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <PopupMenu trigger={trigger(user.imageUrl)} position="bottom right" closeOnDocumentClick>
      <Fragment>
        <InfoUser
          isHost={user.isHost || false}
          id={user.id}
          imageUrl={user.imageUrl}
          name={user.name}
        />
        {user.isHost && (
          <Fragment>
            <TitleMenu>スペース運営</TitleMenu>
            <MenuItem
              title="スペースの新規登録"
              to={Path.spaceCreate1()}
              onClick={() => dispatch(uiActions.setUiState({ space: {} }))}
            />
            <MenuItem title="スペースの管理" to={Path.spaces()} />
            <MenuItem title="利用状況" to={Path.schedule()} />
            <MenuItem title="売上・振込申請" to={Path.sales()} />
          </Fragment>
        )}
        {user && (
          <MenuItem
            title="ログアウト"
            onClick={e => {
              e.preventDefault();
              dispatch(authActions.logout());
            }}
            blank
            logout
          />
        )}
      </Fragment>
    </PopupMenu>
  );
};

export default MenuPC;
