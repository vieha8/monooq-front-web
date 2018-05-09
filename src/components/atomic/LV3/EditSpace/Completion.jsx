// @flow

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Button from 'components/atomic/LV1/Button';
import { H1, H2 } from 'components/atomic/LV1/Headline';
import { Dimens } from 'variables';
import GoogleTagManager from 'components/GTM';

const Section = styled.div`
  margin-top: ${Dimens.medium3}px;
`;

type PropTypes = {
  edit?: boolean,
  space: {
    userId: number,
  },
  onClickViewSpace: Function,
};

export default class SpaceCreatedCompletion extends Component<PropTypes> {
  componentDidMount() {
    if (!this.props.edit && this.props.space) {
      const script = document.createElement('script');

      script.innerHTML = `var __atw = __atw || [];
    __atw.push({ "merchant" : "monooq", "param" : {
        "result_id" : "101",
        "verify" : "host_register_${this.props.space.userId}",
    }});
(function(a){var b=a.createElement("script");b.src="https://h.accesstrade.net/js/nct/cv.min.js";b.async=!0;
a=a.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})(document);`;

      document.body.appendChild(script);
    }
  }

  render() {
    const { edit, space, onClickViewSpace } = this.props;
    return (
      <Fragment>
        <H1>{`スペースの${edit ? '編集' : '登録'}が完了しました！`}</H1>
        <Section>
          <H2>
            ユーザーからの相談を待ちましょう。<br />安心してもらえるようにメッセージは素早い対応を心がけましょう！
          </H2>
        </Section>
        {space && (
          <Section>
            <Button primary fill={1} onClick={onClickViewSpace}>
              {edit ? '編集' : '登録'}したスペースを見る
            </Button>
          </Section>
        )}
        <GoogleTagManager event="spaceRegistered" />
      </Fragment>
    );
  }
}
