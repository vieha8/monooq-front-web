// @flow

import React, { Fragment } from 'react';
import InlineText from 'components/LV1/Texts/InlineText';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import RadioList from 'components/LV2/Forms/RadioList';
import { Colors, FontSizes } from 'variables';
import { formatName } from 'helpers/string';
import Form from './Form';

const inlineText = (text, userName, fontSize, bold, color) => {
  return (
    <InlineText.Base fontSize={fontSize} bold={bold} color={color}>
      {userName && (
        <Fragment>
          {`${formatName(userName)}さん`}
          <br />
        </Fragment>
      )}
      {text}
    </InlineText.Base>
  );
};

const radioList = (onChangeIsHost, isHost) => {
  return (
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
  );
};

const buttonEntry = (buttonDisabled, buttonLoading, onClickSkip, onClickRegisterProfile) => {
  return (
    <ButtonEntry
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
  );
};

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
    title={inlineText('モノオクへようこそ！', userName, FontSizes.medium2, true, '')}
    caption={inlineText(
      'モノオクにご登録いただきありがとうございます！\nモノオクのご利用方法を教えてください。あなたに最適な情報をご提示します。',
      '',
      '',
      false,
      '',
    )}
    isHost={radioList(onChangeIsHost, isHost)}
    captionSub={inlineText(
      '※ご利用方法が変わった場合はプロフィールから変更できます',
      '',
      FontSizes.small_12,
      false,
      Colors.darkGray2,
    )}
    button={buttonEntry(buttonDisabled, buttonLoading, onClickSkip, onClickRegisterProfile)}
  />
);
