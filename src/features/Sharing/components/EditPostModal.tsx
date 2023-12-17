/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// styles
import useStyles from './styles';

// actions
import { actDeleteImage } from 'redux/actions/image.action';

// hooks
import useSaveSharing from 'hooks/useSaveSharing';

// react-redux
import { useDispatch } from 'react-redux';

// alert
import { enqueueSnackbarAction } from 'redux/actions/app.action';

type IProps = {
  isOpen: boolean;
  handleClose: () => void;
  data: any;
};

export default function EditPostModal({ isOpen, handleClose, data }: IProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const saveSharing = useSaveSharing();
  const [newImageURL, setNewImageURL] = useState<string>('');
  const [values, setValues] = useState<any>({
    title: '',
    description: '',
    thumbnail: '',
    link: '',
  });

  useEffect(() => {
    setValues(data);
  }, [data]);

  useEffect(() => {
    return () => {
      newImageURL && URL.revokeObjectURL(newImageURL);
    };
  }, [newImageURL]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  const handleChangeImage = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setValues({
      ...values,
      thumbnail: file,
    });
    setNewImageURL(URL.createObjectURL(file));
  };
  const handleCloseModal = async () => {
    handleClose();
  };
  const handleSubmit = async () => {
    await saveSharing.mutate(
      { ...values, id: data.id },
      {
        onSuccess: () => {
          dispatch(
            enqueueSnackbarAction({
              key: new Date().getTime() + Math.random(),
              message: 'Chỉnh sửa bài viết thành công',
              variant: 'success',
            }),
          );
        },
        onError: () => {
          dispatch(
            enqueueSnackbarAction({
              key: new Date().getTime() + Math.random(),
              message: saveSharing.error?.message || 'Chỉnh sửa bài viết không thành công',
              variant: 'error',
            }),
          );
        },
      },
    );
    if (newImageURL) await actDeleteImage(data.thumbnail);
    if (saveSharing.isSuccess)
      setTimeout(() => {
        saveSharing.reset();
        handleClose();
      }, 1000);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={isOpen} aria-labelledby="max-width-dialog-title">
        <DialogContent>
          <Typography variant="h5" color="textPrimary">
            Sửa bài viết
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                value={values.title}
                onChange={handleInputChange}
                fullWidth
                id="title"
                label="Tiêu đề"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                value={values.description}
                onChange={handleInputChange}
                fullWidth
                id="description"
                label="Nội dung"
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
            <Grid className={classes.container} item xs={12}>
              <Button className={classes.buttonUpload} variant="contained" component="label">
                UPLOAD FILE
                <input name="thumbnail" accept="image/*" type="file" onChange={handleChangeImage} hidden />
              </Button>
              <img
                src={newImageURL ? `${newImageURL}` : `${process.env.REACT_APP_ENDPOINT_URL}/uploads/images/${data.thumbnail}`}
                alt={data.title}
                width="100px"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="link"
                value={values.link}
                onChange={handleInputChange}
                fullWidth
                id="link"
                label="Link"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            color="primary"
            size="small"
            disabled={values.title === '' || values.description === '' || values.link === ''}
          >
            {saveSharing.isLoading
              ? 'SAVING...'
              : saveSharing.isError
              ? saveSharing.error.message
              : saveSharing.isSuccess
              ? 'SAVED!'
              : 'SAVE POST'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
