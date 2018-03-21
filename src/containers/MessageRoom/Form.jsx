import React from 'react';
import styled from 'styled-components';
import Path from "../../config/path";
import {Colors} from "../../variables";
import {media} from "../../helpers/style/media-query";

export default props => (
  <SubmitMessageForm>
    <AddFile>
      <AddFileIcon>
        <i className="far fa-image" />
      </AddFileIcon>
      <AddFileText>写真を送信する</AddFileText>
      <input type="file" onChange={props.handleChangeFile} accept=".jpg,.png,image/jpeg,image/png" />
    </AddFile>
    <AddMessageTextarea
      placeholder="メッセージを入力する…"
      value={props.ui.message}
      onChange={props.handleChange}
      disabled={props.ui.isSending}
    />
    <AddMessageButton submit onClick={props.sendTextMessage}>
      送信
    </AddMessageButton>
    <AddMessageButton estimate onClick={() => props.history.push(Path.estimate(props.ui.roomId))}>
      見積もりを送る
    </AddMessageButton>
  </SubmitMessageForm>
);

const AddFile = styled.div`
  display: flex;
`;

const AddFileIcon = styled.div`
  color: #bcbcbc;
  font-size: 30px;
`;

const AddFileText = styled.div`
  color: #bcbcbc;
  font-size: 12px;
  line-height: 30px;
  padding-left: 9px;
  cursor: pointer;
  ${media.phone`
    font-size: 12px;
  `};
`;

const AddMessageTextarea = styled.textarea`
  width: 100%;
  height: 160px;
  font-size: 14px;
  color: ${Colors.darkGray1};
  padding: 15px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #bcbcbc;
  border-radius: 2px;
  background-color: #fafafa;
  resize: none;
  &:placeholder-shown,
  &::-webkit-input-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder {
    color: ${Colors.lightGray1};
  }
`;

const AddMessageButton = styled.div`
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  padding: 18px 0;
  margin-bottom: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  ${props =>
  props.submit
    ? `
      color: ${Colors.white};
      background: ${Colors.brandPrimary};
      :hover {
        background: ${Colors.brandTerciary};
      }
      :active {
        background: ${Colors.brandSecondary};
      }
    `
    : ''};
  ${props =>
  props.estimate
    ? `
      color: ${Colors.brandPrimary};
      background: ${Colors.white};
      border: 1px solid;
      :hover {
        color: ${Colors.brandTerciary};
      }
      :active {
        color: ${Colors.brandSecondary};
      }
    `
    : ''};
`;

const SubmitMessageForm = styled.div`
  margin-top: 110px;
  ${media.phone`
    margin-top: 24px;
    padding: 0 20px;
  `};
`;