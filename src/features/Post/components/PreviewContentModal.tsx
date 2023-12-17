import React, { useEffect, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

type IProps = {
  isOpen: boolean;
  handleClose: () => void;
  data: any;
};

export default function PreviewContentModal({ isOpen, handleClose, data }: IProps) {
  const [values, setValues] = useState<string>('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    setValues(data);
  }, [data]);

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="xl"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
          <div dangerouslySetInnerHTML={{ __html: values }}></div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
