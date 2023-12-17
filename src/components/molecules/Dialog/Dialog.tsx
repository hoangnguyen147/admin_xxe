import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material core
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

// actions
import { dialogSelector } from 'redux/selectors/app.selector';
import { setDialog } from 'redux/actions/app.action';

// selectors

export default function DialogError() {
  const dispatch = useDispatch();
  const { isShow } = useSelector(dialogSelector);

  const handleClose = () => {
    dispatch(setDialog(false));
  };

  return (
    <div>
      <Dialog open={isShow} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Typography variant="h4" component="div">
            Error
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Something went wrong from systems!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
