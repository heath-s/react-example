import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

type ConfirmDialogProps = {
  content: string;
  onClose: (answer: boolean) => void;
  open: boolean;
};

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const handleClose = (answer?: boolean) => props.onClose(!!answer);

  return (
    <>
      <Dialog
        open={props.open}
        onClose={() => handleClose()}>
        <DialogContent>
          <DialogContentText>{props.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleClose(false)}>아니요</Button>
          <Button color="primary" onClick={() => handleClose(true)}>예</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
