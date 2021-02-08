import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react';
import { errorActions } from 'redux/modules/error';

const usePrevious = value => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const ErrorModal = ({ dispatch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const prevState = usePrevious(isOpen);

  const error = useSelector(state => state.error);

  useEffect(() => {
    if (error.hasError && !prevState) {
      setIsOpen(true);
    }
  }, [error.hasError, prevState]);

  return (
    <Modal size="large" open={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Header>Sorry...</Modal.Header>
      <Modal.Content>
        {error.message !== '' ? (
          <p>{error.message}</p>
        ) : (
          <p>
            エラーが発生しました。ご不便をおかけし大変申し訳ございません。
            <br />
            <br />
            日々改善に努めております。しばらく時間を置いて再度試しても解決されない場合は、お手数ですがお問い合わせください。
          </p>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            dispatch(errorActions.resetError());
            setIsOpen(false);
          }}
        >
          閉じる
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default connect()(ErrorModal);
