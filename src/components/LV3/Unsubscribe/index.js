import React, { Fragment } from 'react';
import { Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import InlineText from 'components/LV1/Texts/InlineText';
import { H1 } from 'components/LV1/Texts/Headline';
import InputForm from 'components/LV2/Forms/InputForm';
import 'stylesheets/dropdown_overrides.css';

const Caption = styled.div`
  margin: ${Dimens.medium_20}px 0;
`;

const Row = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${props =>
    props.alignRight &&
    `
    text-align: right;
  `};
  ${props =>
    props.mobile &&
    `
    display: none;
  `};
  ${media.tablet`
    ${props =>
      props.mobile &&
      `
      display: block;
    `};
  `};
`;

const ButtonWrapper = styled.div`
  max-width: 240px;
  margin: ${Dimens.medium2}px auto 0;
  ${media.phone`
      max-width: 100%;
  `};
`;

const styles = {
  dropdown: {
    background: Colors.white,
    borderColor: Colors.lightGray1,
  },
};

const StyledDropdown = styled(Dropdown)`
  &:focus {
    border-color: ${Colors.brandPrimary} !important;
  }
`;

export default ({
  onChangeReasonType,
  reasonTypeError,
  reasonText,
  onChangeReasonText,
  buttonDisabled,
  onClickUnsubscribe,
  buttonLoading,
  onKeyDownUnsubscribe,
}) => (
  <Fragment>
    <H1 bold>退会の理由</H1>
    <Caption>
      モノオクをご利用頂き、ありがとうございました。サービス改善の為にアンケートにご協力ください。
    </Caption>
    <InlineText.EmphasisSmall>
      当てはまる理由をご選択ください。今後のサービス改善の参考とさせていただきます。
    </InlineText.EmphasisSmall>
    <Row>
      <StyledDropdown
        style={styles.dropdown}
        options={[
          { value: 'サービスの使い方がわからない', text: 'サービスの使い方がわからない' },
          { value: '借りたいスペースが見つからない', text: '借りたいスペースが見つからない' },
          { value: 'リクエストが来ない', text: 'リクエストが来ない' },
          { value: '取引相手の対応が悪い', text: '取引相手の対応が悪い' },
          { value: 'その他', text: 'その他' },
        ]}
        fluid
        selection
        multiple
        placeholder="選択してください"
        onChange={(_, data) => onChangeReasonType(data.value)}
      />
      {reasonTypeError && (
        <InlineText.Small color={Colors.error}>{reasonTypeError}</InlineText.Small>
      )}
    </Row>
    <Row>
      <InputForm
        multiline
        rows={4}
        placeholder="ご意見・ご要望などがあれば入力してください"
        value={reasonText}
        onChange={e => onChangeReasonText(e.target.value)}
      />
    </Row>
    <ButtonWrapper>
      <Button
        primary
        fill={1}
        fontbold
        disabled={buttonDisabled}
        onClick={onClickUnsubscribe}
        loading={buttonLoading}
        onKeyDown={onKeyDownUnsubscribe}
      >
        退会する
      </Button>
    </ButtonWrapper>
  </Fragment>
);
