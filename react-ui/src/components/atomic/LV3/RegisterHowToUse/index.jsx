// @flow

import React, { Fragment } from 'react';
import InlineText from 'components/atomic/LV1/InlineText';
import RadioList from 'components/atomic/LV2/RadioList';
import { Colors, FontSizes } from 'variables';
import EntryButtons from 'components/atomic/LV2/EntryButtons';
import Form from './Form';

type PropTypes = {
  buttonDisabled: boolean,
  buttonLoading: boolean,
  onClickSkip: Function,
  onClickRegisterProfile: Function,
};

export default (props: PropTypes) => (
  <Form
    title={
      <InlineText.Base fontSize={FontSizes.medium2} bold>
        {props.userName && `${props.userName}さん<br />`}
        モノオクへようこそ！
      </InlineText.Base>
    }
    caption={
      <InlineText.Base>
        モノオクにご登録いただきありがとうございます！
        <br />
        モノオクのご利用方法を教えてください。あなたに最適な情報をご提示します。
      </InlineText.Base>
    }
    isHost={
      <RadioList
        labels={[
          <Fragment>
            保管スペースを借りて荷物を
            <InlineText.Base fontSize={FontSizes.small_15} color={Colors.brandPrimary} bold>
              預けたい
            </InlineText.Base>
          </Fragment>,
          <Fragment>
            保管スペースを貸して荷物を
            <InlineText.Base fontSize={FontSizes.small_15} color={Colors.brandPrimary} bold>
              預かりたい
            </InlineText.Base>
          </Fragment>,
        ]}
        onClick={props.onChangeIsHost}
        checkedIndex={props.isHost}
        border
      />
    }
    captionSub={
      <InlineText.Base fontSize={FontSizes.small_12} color={Colors.darkGray2}>
        ※ご利用方法が変わった場合はプロフィールから変更できます
      </InlineText.Base>
    }
    button={
      <EntryButtons
        enabled
        rerative
        backButton={{
          text: 'スキップ',
          disabled: props.buttonDisabled,
          loading: props.buttonLoading,
          onClick: props.onClickSkip,
        }}
        enabledButton={{
          text: '決定',
          disabled: props.buttonDisabled,
          loading: props.buttonLoading,
          onClick: props.onClickRegisterProfile,
        }}
      />
    }
  />
);
