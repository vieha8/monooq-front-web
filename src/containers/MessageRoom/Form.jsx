import React from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import Dropzone from 'react-dropzone';
import Button from 'components/Shared/Button';
import { Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const AddFile = styled.div`
  cursor: pointer;
`;

const AddFileIcon = styled.div`
  display: inline-block;
  vertical-align: middle;
  color: #bcbcbc;
  font-size: 30px;
`;

const AddFileText = styled.div`
  display: inline-block;
  vertical-align: middle;
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

const SubmitMessageForm = styled.div`
  margin-top: 110px;
  ${media.phone`
    margin-top: 24px;
    padding: 0 20px;
  `};
`;

const StyledDropZone = styled(Dropzone) `
  width: 100%;
  margin-top: ${Dimens.medium}px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const Thumbnail = styled.img`
  display: block;
  margin-top: ${Dimens.medium}px;
  height: 80px;
  object-fit: cover;
`;

export default props => (
  <SubmitMessageForm>
    <AddMessageTextarea
      placeholder="メッセージを入力する…"
      value={props.ui.message}
      onChange={props.handleChange}
      disabled={props.ui.isSending}
    />
    <StyledDropZone
      accept="image/jpeg, image/png"
      onDrop={data => props.handleChangeFile(data[0])}
    >
      <AddFile>
        <AddFileIcon>
          <i className="far fa-image" />
        </AddFileIcon>
        <AddFileText>写真を送信する</AddFileText>
      </AddFile>
    </StyledDropZone>
    {props.ui.messageImage && (
      <Thumbnail
        src={props.ui.messageImage.preview}
      />
    )}
    <ButtonWrapper>
      <Button
        disabled={props.ui.message === '' && !props.ui.messageImage}
        primary
        onClick={props.sendTextMessage}
      >
        送信
      </Button>
    </ButtonWrapper>
    {(props.room.space.UserID === props.userId) &&
      <ButtonWrapper>
        <Button
          secondary
          onClick={() => props.history.push(Path.estimate(props.ui.roomId))}
        >
          見積もりを送る
        </Button>
      </ButtonWrapper>
    }

  </SubmitMessageForm>
);
