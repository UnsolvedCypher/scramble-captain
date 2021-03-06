import {
  Modal, Button, Form, Message,
} from 'semantic-ui-react';

import React from 'react';
import { authFetch } from './withAuthSync';

interface NUMState {
  open: boolean;
  name: string,
  createdUser: {id: string; password: string;}
}

interface NUMProps {
  competitionId: number;
  onAdd: () => void;
}

class NewUserModal extends React.Component<NUMProps, NUMState> {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      createdUser: null,
    };
  }

  createUser = async () => {
    const { competitionId } = this.props;
    const { name } = this.state;
    const res = await authFetch(`api/competitions/${competitionId}/scramblers`, 'post', { name }, null);
    if (res.status === 200) {
      this.setState({ createdUser: await res.json() });
    }
  }

  resetState = () => {
    const { createdUser } = this.state;
    if (createdUser != null) {
      const { onAdd } = this.props;
      onAdd();
    }
    this.setState({
      name: '',
      open: false,
      createdUser: null,
    });
  }

  render = () => {
    const { open, createdUser, name } = this.state;
    return (
      <>
        <Button
          icon="plus"
          content="Add user"
          onClick={() => this.setState({ open: true })}
        />
        <Modal
          open={open}
          onClose={this.resetState}
          size="tiny"
        >
          <Modal.Header>Create scrambler</Modal.Header>
          <Modal.Content>
            <Form>
              {createdUser == null ? (
                <>
                  <p>Create a user to control their scramble access</p>
                  <Form.Input
                    label="Name"
                    type="text"
                    placeholder="ex. Scrambling Laptop 1"
                    autoFocus
                    value={name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </>
              ) : (
                <>
                  <Message attached header="Log onto Scramble Captain with these credentials from the scrambling device" style={{ textAlign: 'center' }} />
                  <Message attached>
                    User ID:
                    {' '}
                    {createdUser.id}
                    <br />
                    User password:
                    {' '}
                    {createdUser.password}
                  </Message>
                  <Message negative content="Be sure to write down the password! You will not be able to look at it again" />
                </>
              )}
            </Form>
          </Modal.Content>
          <Modal.Actions>
            {createdUser == null ? (
              <>
                <Button negative content="Cancel" onClick={() => this.setState({ open: false })} />
                <Button primary content="Create user" onClick={this.createUser} />
              </>
            ) : (
              <Button content="Click to close" onClick={this.resetState} />
            )}
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default NewUserModal;
