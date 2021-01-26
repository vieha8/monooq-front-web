import React, { Fragment } from 'react';
import MenuItem from 'components/LV2/Items/MenuItem';
import InfoUser from 'components/LV2/InfoUser';

const ServiceMenu = ({
  userId,
  userImage,
  userName,
  history,
  signupUrl,
  loginUrl,
  top,
  about,
  messages,
  haisou,
  isLogin,
  schedule,
  isHost,
  addSpace,
  spaces,
  sales,
  inquiry,
  howtouse,
  help,
  logoutEvent,
  close,
}) => (
  <Fragment>
    {isLogin ? (
      <Fragment>
        <InfoUser isHost={isHost} id={userId} imageUrl={userImage} name={userName} close={close} />
        {isHost ? (
          <Fragment>
            <MenuItem title="閲覧履歴" {...history} />
            <MenuItem title="スペース運営" header />
            <MenuItem title="スペースの新規登録" {...addSpace} />
            <MenuItem title="スペースの管理" {...spaces} />
            <MenuItem title="利用状況" {...schedule} />
            <MenuItem title="売上・振込申請" {...sales} />
          </Fragment>
        ) : (
          <Fragment>
            <MenuItem title="マイページ" header />
            <MenuItem title="閲覧履歴" {...history} />
            <MenuItem title="メッセージ管理" {...messages} />
            <MenuItem title="配送手配" {...haisou} blank className="gaMenuSpRentoraLink" />
          </Fragment>
        )}
      </Fragment>
    ) : (
      <Fragment>
        <MenuItem title="新規登録・ログイン" header />
        <MenuItem title="新規登録" {...signupUrl} />
        <MenuItem title="ログイン" {...loginUrl} />
        <MenuItem title="履歴" header />
        <MenuItem title="スペース閲覧履歴" {...history} />
      </Fragment>
    )}
    <MenuItem title="サービスについて" header />
    {isLogin ? (
      <MenuItem title="トップページ" {...top} />
    ) : (
      <MenuItem title="モノオクとは？" {...about} />
    )}
    <MenuItem title="利用の流れ" {...howtouse} />
    <MenuItem title="よくある質問" {...help} blank />
    <MenuItem title="お問い合わせ" {...inquiry} />
    {isLogin && <MenuItem title="ログアウト" {...logoutEvent} blank logout />}
  </Fragment>
);

export default ServiceMenu;
