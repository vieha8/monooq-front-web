import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopupMenu from 'reactjs-popup';
import styled from 'styled-components';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';
import InlineText from 'components/LV1/Texts/InlineText';
import AvatarIcon from 'components/LV2/ButtonHeader/AvatarIcon';
import InfoUser from 'components/LV2/InfoUser';
import MenuItem from 'components/LV2/Items/MenuItem';

import { Colors, Dimens, FontSizes } from 'variables';

const MenuInner = styled.div``;

const Section = styled.div`
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

const MenuPC = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const trigger = imageUrl => (
    <div>
      <Section>
        <AvatarIcon imageSrc={imageUrl} />
      </Section>
      <Section>
        <InlineText.Base bold>マイページ</InlineText.Base>
      </Section>
    </div>
  );

  return (
    <PopupMenu
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      trigger={trigger(user.imageUrl)}
      position="bottom right"
      closeOnDocumentClick
    >
      <MenuInner onClick={() => setIsOpen(false)}>
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
      </MenuInner>
    </PopupMenu>
  );
};

export default MenuPC;
