import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import GoogleTagManager from 'components/LV1/GTM';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import { Dimens } from 'variables';
import { handleAccessTrade, handleCircuitX } from 'helpers/asp';

const Section = styled.div`
  margin-top: ${Dimens.medium}px;
`;

export default class SpaceCreatedCompletion extends Component {
  componentDidMount() {
    const { edit, userId } = this.props;
    if (!edit && userId) {
      handleAccessTrade(101, `host_register_${userId}`);
      handleCircuitX(1375, userId);
      handleCircuitX(1378, userId);
    }
  }

  render() {
    const {
      story,
      edit,
      onClickCreateSpace,
      onKeyDownCreateSpace,
      onClickBackTop,
      onKeyDownTop,
      onClickViewSpace,
      onKeyDownViewSpace,
    } = this.props;
    return (
      <Fragment>
        {!edit ? (
          <Section>
            <ButtonEntry
              enabled
              relative
              backButton={{
                text: 'スペースをさらに登録する',
                onClick: onClickCreateSpace,
                onKeyDown: onKeyDownCreateSpace,
              }}
              enabledButton={{
                text: `トップに戻る`,
                onClick: onClickBackTop,
                onKeyDown: onKeyDownTop,
              }}
            />
          </Section>
        ) : (
          <Section>
            <ButtonEntry
              enabled
              relative
              backButton={{
                text: '編集したページを確認する',
                onClick: onClickViewSpace,
                onKeyDown: onKeyDownViewSpace,
              }}
              enabledButton={{
                text: `トップに戻る`,
                onClick: onClickBackTop,
                onKeyDown: onKeyDownTop,
              }}
            />
          </Section>
        )}
        {!story && <GoogleTagManager event="spaceRegistered" />}
      </Fragment>
    );
  }
}
