import {
  Modal, Button,
} from 'semantic-ui-react';

import React from 'react';
import { authFetch } from './withAuthSync';

interface DCMProps {
  afterDelete: () => void;
  confirmationText: string;
  deleteUrl: string;
  buttonFluid?: boolean;
  buttonBasic?: boolean;
}

interface DCMState {
  open: boolean;
}

class DeleteConfirmationModal extends React.Component<DCMProps, DCMState> {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  doDelete = async () => {
    const { deleteUrl, afterDelete } = this.props;
    const res = await authFetch(deleteUrl, 'delete', null, null);
    if (res.status === 200) {
      this.setState({ open: false });
      afterDelete();
    }
  }

  render = () => {
    const { confirmationText, buttonFluid, buttonBasic } = this.props;
    const { open } = this.state;
    return (
      <>
        <Button
          content="Delete"
          fluid={buttonFluid}
          negative
          basic={buttonBasic}
          onClick={() => this.setState({ open: true })}
        />
        <Modal
          size="tiny"
          open={open}
          onClose={() => this.setState({ open: false })}
        >
          <Modal.Header>Confirm deletion</Modal.Header>
          <Modal.Content content={confirmationText} />

          <Modal.Actions>
            <Button content="Cancel" onClick={() => this.setState({ open: false })} />
            <Button content="Delete" negative onClick={this.doDelete} />
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default DeleteConfirmationModal;
