import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';

const ModalToProfileEdit = ({ header, content }) => {
  const [isOpen, setStateOpen] = useState(true);
  return (
    <Modal size="large" open={isOpen} onClose={() => setStateOpen(false)}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>{content}</Modal.Content>
      <Modal.Actions>
        <Button className="brandPrimary" onClick={() => setStateOpen(false)}>
          閉じる
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalToProfileEdit;
