import {
  Modal, Button, Form,
} from 'semantic-ui-react';

import React from 'react';
import { authFetchForm } from './withAuthSync';

interface NSMState {
  open: boolean;
  success: boolean;
  files: Array<File>;
}

interface NSMProps {
  competitionId: number;
  onAdd: () => void;
}

class NewScrambleModal extends React.Component<NSMProps, NSMState> {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      open: false,
      files: [],
    };
  }

  doUpload = async () => {
    const { competitionId } = this.props;
    const { files } = this.state;
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`scramble-${index}`, file);
    });
    formData.append('numScrambles', `${files.length}`);
    const res = await authFetchForm(`api/competitions/${competitionId}/scrambles`, 'post', formData, null);
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
      files: [],
      open: false,
      success: false,
    });
  }

  render = () => {
    const { open, success } = this.state;
    return (
      <>
        <Button
          icon="upload"
          content="Upload scrambles"
          onClick={() => this.setState({ open: true })}
        />
        <Modal
          open={open}
          onClose={() => this.setState({ open: false })}
        >
          <Modal.Header>Upload scrambles</Modal.Header>
          <Modal.Content>
            <Form>
              <p>Upload one or more scrambles (as PDF, not zip) below:</p>
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={(e) => this.setState({ files: Array.from(e.target.files) })}
              />
              {success ? (
                <Button positive content="Success! Click to close" onClick={this.resetState} />
              ) : (
                <Button primary content="Upload" onClick={this.doUpload} />
              )}
            </Form>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

export default NewScrambleModal;
