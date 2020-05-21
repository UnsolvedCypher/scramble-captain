import { Button } from 'semantic-ui-react';

interface OCBProps {
  open: boolean;
  onPermissionChange: (open: boolean) => void;
}

export default (props: OCBProps) => {
  const { open, onPermissionChange } = props;
  return (
    <Button.Group>
      <Button negative={!open} onClick={() => onPermissionChange(false)}>Close</Button>
      <Button.Or />
      <Button positive={open} onClick={() => onPermissionChange(true)}>Open</Button>
    </Button.Group>
  );
};
