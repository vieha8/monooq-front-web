import React, { Fragment, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Path from 'config/path';
import { Dimens, Colors, FontSizes, ErrorMessages } from 'variables';
import { iskeyDownEnter } from 'helpers/keydown';
import { messagesActions } from 'redux/modules/messages';
import Button from 'components/LV1/Forms/Button';
import InputField from 'components/LV1/Forms/InputField';
import { PictureIcon } from 'components/LV1/Images/ActionIcon';
import InlineText from 'components/LV1/Texts/InlineText';
import { isTrimmedEmpty } from 'helpers/validations/string';

const Section = styled.div`
  margin-top: ${props => (props.image ? Dimens.medium3_40 : Dimens.medium)}px;
`;

const PickImageText = styled(InlineText.Small)`
  display: inline-block;
  margin-left: 8px;
  vertical-align: middle;
`;

const Thumbnail = styled.img`
  display: block;
  height: 80px;
  margin-top: ${Dimens.medium}px;
  object-fit: cover;
`;

const MessageErr = styled.div`
  white-space: pre-wrap;
  font-size: ${FontSizes.small}px;
  color: ${Colors.error};
`;

const MessegeSendForm = ({ hostUser, userIdFrom, userIdTo, isOpenModalError }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { message_room_id: messageRoomId } = useParams();
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isErrorPickImage, setErrorPickImage] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = e => {
      e.preventDefault();
      e.returnValue = '未送信のメッセージが取り消されますが、よろしいですか?';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  });

  const onClickEstimate = () => {
    history.push(Path.estimate(messageRoomId));
  };

  const doSend = () => {
    if (text === '' && !image) {
      return;
    }

    dispatch(
      messagesActions.sendMessage({
        roomId: messageRoomId,
        userId: userIdFrom,
        text,
        image,
        toUserId: userIdTo,
      }),
    );

    setText('');
    setImage(null);
    setImagePreview(null);
  };

  const onPickImage = tpmImage => {
    setImage(tpmImage);
    setImagePreview(URL.createObjectURL(tpmImage));
    setErrorPickImage(false);
  };

  const onKeyDown = e => {
    if (iskeyDownEnter(e) && (text !== '' || image)) {
      doSend();
    }
  };

  const isDisabled = isOpenModalError || (isTrimmedEmpty(text) && !image) || isErrorPickImage;

  return (
    <Fragment>
      <Section image>
        <Dropzone
          accept="image/jpeg, image/png"
          onDropAccepted={data => onPickImage(data[0])}
          onDropRejected={() => setErrorPickImage(true)}
          maxSize={10485760} // 10MB
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <PictureIcon verticalMiddle fontSize={24} />
              <PickImageText>写真を送信する</PickImageText>
              {isErrorPickImage && (
                <MessageErr>{ErrorMessages.OverSizeSpaceImage('10MB')}</MessageErr>
              )}
              <input {...getInputProps()} />
              {imagePreview && <Thumbnail src={imagePreview} />}
            </div>
          )}
        </Dropzone>
        <InputField
          as="textarea"
          rows={5}
          placeholder="メッセージを入力する…"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </Section>
      <Section>
        <Button
          primary
          fill={1}
          fontbold
          disabled={isDisabled}
          onClick={isDisabled ? null : () => doSend()}
          onKeyDown={onKeyDown}
        >
          送信
        </Button>
      </Section>
      {hostUser && (
        <Section>
          <Button secondary fill={1} fontbold onClick={onClickEstimate}>
            見積もりを送る
          </Button>
        </Section>
      )}
    </Fragment>
  );
};

export default MessegeSendForm;
