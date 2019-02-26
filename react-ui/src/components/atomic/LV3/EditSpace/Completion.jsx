// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import EntryButtons from 'components/atomic/LV2/EntryButtons';
import { Dimens } from 'variables';
import GoogleTagManager from 'components/atomic/LV1/GTM';

const Section = styled.div`
  margin-top: ${Dimens.medium}px;
`;

type PropTypes = {
  edit?: boolean,
  userId: number,
  onClickViewSpace: Function,
  story?: boolean,
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
      edit,
      space,
      onClickViewSpace,
      onClickBackHome,
      onClickCreateSpace,
      story,
    } = this.props;
    return (
      <Fragment>
        {space &&
          (!edit ? (
            <Section>
              <EntryButtons
                enabled
                backButton={{
                  text: 'スペースをさらに登録する',
                  onClick: onClickCreateSpace,
                }}
                enabledButton={{
                  text: `ホームへ戻る`,
                  onClick: onClickBackHome,
                }}
              />
            </Section>
          ) : (
            <Section>
              <EntryButtons
                enabled
                backButton={{
                  text: '編集したページを確認する',
                  onClick: onClickViewSpace,
                }}
                enabledButton={{
                  text: `ホームへ戻る`,
                  onClick: onClickBackHome,
                }}
              />
            </Section>
          ))}
        {!story && <GoogleTagManager event="spaceRegistered" />}
      </Fragment>
    );
  }
}
