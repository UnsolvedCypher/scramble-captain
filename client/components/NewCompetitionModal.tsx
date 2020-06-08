import {
  Modal, Button, Form,
} from 'semantic-ui-react';

import React from 'react';
import { authFetch } from './withAuthSync';

interface NCMState {
  open: boolean;
  name: string,
  success: boolean;
}

interface NCMProps {
  onAdd: () => void;
}

class NewCompetitionModal extends React.Component<NCMProps, NCMState> {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      success: false,
    };
  }

  createCompetition = async () => {
    const { name } = this.state;
    const res = await authFetch('api/competitions', 'post', { competition: { name } }, null);
    if (res.status === 201) {
      this.setState({ success: true });
    }
  }

  resetState = () => {
    const { success } = this.state;
    if (success) {
      const { onAdd } = this.props;
      onAdd();
    }
    this.setState({
      name: '',
      open: false,
      success: false,
    });
  }

  render = () => {
    const { open, success, name } = this.state;
    return (
      <>
        <Button
          icon="plus"
          content="New competition"
          onClick={() => this.setState({ open: true })}
        />
        <Modal
          open={open}
          onClose={this.resetState}
        >
          <Modal.Header>Create competition</Modal.Header>
          <Modal.Content>
            <Form>
              {!success ? (
                <>
                  <Form.Input
                    label="Name"
                    type="text"
                    placeholder="ex. WCA World Championship 2050"
                    autoFocus
                    value={name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                  <Button primary content="Create competition" onClick={this.createCompetition} />
                </>
              ) : (
                <Button positive content="Success! Click to close" onClick={this.resetState} />
              )}
            </Form>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

export default NewCompetitionModal;
