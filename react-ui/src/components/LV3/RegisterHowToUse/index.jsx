// @flow

import React, { Fragment } from 'react';
import InlineText from 'components/LV1/InlineText';
import RadioList from 'components/LV2/RadioList';
import { Colors, FontSizes } from 'variables';
import EntryButtons from 'components/LV2/EntryButtons';
import { formatName } from 'helpers/string';
import Form from './Form';

type PropTypes = {
  userName: string,
  onChangeIsHost: Function,
  isHost: boolean,
  buttonDisabled: boolean,
  buttonLoading: boolean,
  onClickSkip: Function,
  onClickRegisterProfile: Function,
};

export default ({
  userName,
  onChangeIsHost,
  isHost,
  buttonDisabled,
  buttonLoading,
  onClickSkip,
  onClickRegisterProfile,
}: PropTypes) => (
  <Form
    title={
      <InlineText.Base fontSize={FontSizes.medium2} bold>
        {userName && (
          <Fragment>
            {`${formatName(userName)}さん`}
            <br />
          </Fragment>
        )}
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
        onClick={onChangeIsHost}
        checkedIndex={isHost}
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
          disabled: buttonDisabled,
          loading: buttonLoading,
          onClick: onClickSkip,
        }}
        enabledButton={{
          text: '決定',
          disabled: buttonDisabled,
          loading: buttonLoading,
          onClick: onClickRegisterProfile,
        }}
      />
    }
  />
);
