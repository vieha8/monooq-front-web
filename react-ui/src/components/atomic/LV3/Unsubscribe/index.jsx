// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/atomic/LV1/InlineText';
import InputForm from 'components/atomic/LV2/InputForm';
import { Dropdown } from 'semantic-ui-react';
import Button from 'components/atomic/LV1/Button';

import 'stylesheets/dropdown_overrides.css';

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

type PropTypes = {
  reasonType: number,
  onChangeReasonType: Function,
  reasonTypeError: string,
  reasonText: string,
  onChangeReasonText: Function,
  onClickUnsubscribe: Function,
  buttonLoading: boolean,
};

export default (props: PropTypes) => (
  <Fragment>
    <InlineText.EmphasisSmall>
      当てはまる理由をご選択ください。今後のサービス改善の参考とさせていただきます。
    </InlineText.EmphasisSmall>
    <Row>
      <Dropdown
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
        onChange={(_, data) => props.onChangeReasonType(data.value)}
        value={props.reasonType}
      />
      {props.reasonTypeError && (
        <InlineText.Small color={Colors.error}>{props.reasonTypeError}</InlineText.Small>
      )}
    </Row>
    <Row>
      <InputForm
        multiline
        rows={4}
        placeholder="ご意見・ご要望などがあれば入力してください"
        value={props.reasonText}
        onChange={e => props.onChangeReasonText(e.target.value)}
      />
    </Row>
    <ButtonWrapper>
      <Button
        primary
        fill={1}
        fontbold
        onClick={props.onClickUnsubscribe}
        loading={props.buttonLoading}
      >
        退会する
      </Button>
    </ButtonWrapper>
  </Fragment>
);
