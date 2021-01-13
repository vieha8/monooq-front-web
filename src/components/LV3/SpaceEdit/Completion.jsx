import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Path from 'config/path';
import { Dimens } from 'variables';
import { uiActions } from 'redux/modules/ui';
import { handleAccessTrade, handleCircuitX } from 'helpers/asp';
import { iskeyDownEnter } from 'helpers/keydown';
import { media } from 'helpers/style/media-query';
import GoogleTagManager from 'components/LV1/GTM';
import Button from 'components/LV1/Forms/Button';
import { H1 } from 'components/LV1/Texts/Headline';
import InlineText from 'components/LV1/Texts/InlineText';
import HostGuideList from 'components/LV2/Lists/HostGuideList';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';

const Caption = styled.div`
  margin: ${Dimens.medium_20}px 0;
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: ${Dimens.medium2}px auto ${Dimens.medium2}px 0px;
  ${media.phone`
    width: 100%;
    max-width: 100%;
    padding: 0 0 ${Dimens.small2_15}px;
  `};
`;

const SpaceEditCompletion = ({ story, userId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { space_id: spaceId } = useParams();
  const isUpdate = !!spaceId;

  useEffect(() => {
    if (!isUpdate && userId) {
      handleAccessTrade(101, `host_register_${userId}`);
      handleCircuitX(1375, userId);
      handleCircuitX(1378, userId);
    }
    dispatch(uiActions.setUiState({ space: {} }));
  }, [isUpdate, userId, dispatch]);

  const onClickCreateSpace = () => {
    history.push(Path.spaceCreate1());
  };
  const onKeyDownCreateSpace = e => {
    if (iskeyDownEnter(e)) {
      onClickCreateSpace();
    }
  };

  const onClickViewSpace = () => {
    history.push(Path.space(spaceId));
  };
  const onKeyDownViewSpace = e => {
    if (iskeyDownEnter(e)) {
      onClickViewSpace();
    }
  };

  const onClickBackTop = () => {
    history.push(Path.top());
  };
  const onKeyDownTop = e => {
    if (iskeyDownEnter(e)) {
      onClickBackTop();
    }
  };

  const getButton = (
    textBack,
    onClickBack,
    onKeyDownBack,
    textEnabled,
    onClickEnabled,
    onKeyDownEnabled,
  ) => {
    return (
      <ButtonEntry
        enabled
        relative
        backButton={{
          text: textBack,
          onClick: onClickBack,
          onKeyDown: onKeyDownBack,
        }}
        enabledButton={{
          text: textEnabled,
          onClick: onClickEnabled,
          onKeyDown: onKeyDownEnabled,
        }}
      />
    );
  };

  return (
    <Fragment>
      <H1 bold>{`${isUpdate ? '編集' : '登録'}が完了しました`}</H1>
      <Caption>
        <InlineText.Base>
          {isUpdate ? 'スペースの情報を更新しました！' : 'スペースが掲載されました！'}
          <br />
          リクエストが届くと、ご登録のメールアドレスに通知が届きます。
          <br />
          <br />
          また、モノオク公式LINEを友だち追加すると、預け先が見つからないゲストに、運営があなたのスペースをご紹介。リクエストが増えるかも！
          <br />
          <ButtonWrap>
            <Button line reactGACategory="Space Complete" reactGAAction="Push LINE Register Button">
              友だち追加
            </Button>
          </ButtonWrap>
        </InlineText.Base>
      </Caption>
      <HostGuideList
        header="ご成約までの流れ"
        guideList={[
          {
            text:
              'リクエストが届いてから24時間以内に返信しましょう。早めに返信をすると成約率が高くなります！',
          },
          {
            text:
              '荷物の内容や量・利用期間などゲストの要望を確認し、引き受ける場合は見積もりを提出しましょう。',
          },
          {
            text: (
              <Fragment>
                ゲストの決済が完了すると取引が成立し、スペースの住所がメッセージページに公開されます。
                <br />
                利用開始日になったら荷物を受け取りましょう。
              </Fragment>
            ),
          },
        ]}
      />
      {isUpdate
        ? getButton(
            '編集したページを確認する',
            onClickViewSpace,
            onKeyDownViewSpace,
            `トップに戻る`,
            onClickBackTop,
            onKeyDownTop,
          )
        : getButton(
            'スペースをさらに登録する',
            onClickCreateSpace,
            onKeyDownCreateSpace,
            `トップに戻る`,
            onClickBackTop,
            onKeyDownTop,
          )}
      {!story && <GoogleTagManager event="spaceRegistered" />}
    </Fragment>
  );
};

export default SpaceEditCompletion;
