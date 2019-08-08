// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import GoogleTagManager from 'components/LV1/GTM';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import { Dimens } from 'variables';

const Section = styled.div`
  margin-top: ${Dimens.medium}px;
`;

type PropTypes = {
  story?: boolean,
  edit?: boolean,
  userId: number,
  onClickCreateSpace: Function,
  onKeyDownCreateSpace: Function,
  onClickBackHome: Function,
  onKeyDownHome: Function,
  onClickViewSpace: Function,
  onKeyDownViewSpace: Function,
};

export default class SpaceCreatedCompletion extends Component<PropTypes> {
  componentDidMount() {
    if (!this.props.edit && this.props.userId) {
      const script = document.createElement('script');

      script.innerHTML = `var __atw = __atw || [];
    __atw.push({ "merchant" : "monooq", "param" : {
        "result_id" : "101",
        "verify" : "host_register_${this.props.userId}",
    }});
(function(a){var b=a.createElement("script");b.src="https://h.accesstrade.net/js/nct/cv.min.js";b.async=!0;
a=a.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})(document);`;

      document.body.appendChild(script);
    }
  }

  render() {
    const {
      story,
      edit,
      onClickCreateSpace,
      onKeyDownCreateSpace,
      onClickBackHome,
      onKeyDownHome,
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
                text: `ホームへ戻る`,
                onClick: onClickBackHome,
                onKeyDown: onKeyDownHome,
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
                text: `ホームへ戻る`,
                onClick: onClickBackHome,
                onKeyDown: onKeyDownHome,
              }}
            />
          </Section>
        )}
        {!story && <GoogleTagManager event="spaceRegistered" />}
      </Fragment>
    );
  }
}
