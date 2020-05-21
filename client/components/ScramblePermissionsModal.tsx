import {
  Modal, Button, Form, Label,
} from 'semantic-ui-react';

import React from 'react';
import { authFetch } from './withAuthSync';
import OpenCloseButton from './OpenCloseButton';

interface SPMState {
  open: boolean;
  toOpen: Array<number>;
  toClose: Array<number>;
  success: boolean;
}

interface SPMProps {
  onAdd: () => void;
  scrambleId: number;
  competitionId: number;
  permittedScramblers: Array<number>;
  allScramblers: Array<{id: number; name: string;}>;
}

class ScramblePermissionsModal extends React.Component<SPMProps, SPMState> {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      toOpen: [],
      toClose: [],
      success: false,
    };
  }

  updateScramblePermissions = async () => {
    const { scrambleId, competitionId } = this.props;
    const { toOpen, toClose } = this.state;
    const res = await authFetch(`api/competitions/${competitionId}/scrambles/${scrambleId}`, 'put', { open: toOpen, close: toClose }, null);
    if (res.status === 200) {
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
      toOpen: [],
      toClose: [],
      open: false,
      success: false,
    });
  }

  onPermissionChange = (id: number, open: boolean) => {
    const { toOpen, toClose } = this.state;
    if (open) {
      if (toClose.includes(id)) {
        this.setState({ toClose: toClose.filter((n) => n !== id) });
      } else {
        const newToOpen = toOpen.slice();
        newToOpen.push(id);
        this.setState({ toOpen: newToOpen });
      }
    } else if (toOpen.includes(id)) {
      this.setState({ toOpen: toOpen.filter((n) => n !== id) });
    } else {
      const newToClose = toClose.slice();
      newToClose.push(id);
      this.setState({ toClose: newToClose });
    }
  }

  scramblerIsOpen = (scramblerId: number) => {
    const { toOpen, toClose } = this.state;
    const { permittedScramblers } = this.props;
    // EITHER the scrambler is in the toOpen list, or they're already permitted
    // and aren't in the toClose list

    return toOpen.includes(scramblerId)
    || (!toClose.includes(scramblerId) && permittedScramblers.includes(scramblerId));
  }

  render = () => {
    const { open, success } = this.state;
    const { allScramblers } = this.props;
    return (
      <>
        <Button
          icon="cogs"
          content="Permissions..."
          onClick={() => this.setState({ open: true })}
        />
        <Modal
          open={open}
          onClose={this.resetState}
        >
          <Modal.Header>Open/close scrambles</Modal.Header>
          <Modal.Content>
            <Form>
              {!success ? (
                <>
                  {allScramblers.map((scrambler) => (
                    <React.Fragment key={scrambler.id}>
                      <Label basic content={scrambler.name} />
                      <OpenCloseButton
                        open={this.scramblerIsOpen(scrambler.id)}
                        onPermissionChange={(openScramble) => this.onPermissionChange(
                          scrambler.id, openScramble,
                        )}
                      />
                      <br />
                      <br />
                    </React.Fragment>
                  ))}
                  <Button primary content="Update" onClick={this.updateScramblePermissions} />
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

export default ScramblePermissionsModal;
