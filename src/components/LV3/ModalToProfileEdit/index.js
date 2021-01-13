import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Modal, Button } from 'semantic-ui-react';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';

const ModalToProfileEdit = ({ header, content }) => {
  const [isOpen, setStateOpen] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const onClickButton = () => {
    dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
    history.push(Path.profileEdit());
  };

  return (
    <Modal size="large" open={isOpen} onClose={() => setStateOpen(false)}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>{content}</Modal.Content>
      <Modal.Actions>
        <Button className="brandPrimary" onClick={() => onClickButton()}>
          登録画面へ進む
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalToProfileEdit;
