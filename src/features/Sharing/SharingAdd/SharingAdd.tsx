/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// styles
import useStyles from './styles';

// hooks
import useCreateSharing from 'hooks/useCreateSharing';

// react-router-dom
import { useNavigate } from 'react-router';

// configs
import { PATH_NAME } from 'configs';

// react-redux
import { useDispatch } from 'react-redux';

// alert
import { enqueueSnackbarAction } from 'redux/actions/app.action';

function SharingAdd() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newImageURL, setNewImageURL] = useState<string>('');
  const createSharing = useCreateSharing();
  const [values, setValues] = useState<any>({
    title: '',
    description: '',
    thumbnail: '',
    link: '',
  });

  useEffect(() => {
    return () => {
      newImageURL && URL.revokeObjectURL(newImageURL);
    };
  }, [newImageURL]);
  const resetForm = () => {
    setValues({
      title: '',
      description: '',
      thumbnail: '',
      link: '',
    });
    setNewImageURL('');
    createSharing.reset();
  };

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

  const handleSubmit = () => {
    console.log(values);
    createSharing.mutate(values, {
      onSuccess: () => {
        dispatch(
          enqueueSnackbarAction({
            key: new Date().getTime() + Math.random(),
            message: 'Tạo bài viết thành công',
            variant: 'success',
          }),
        );
      },
      onError: () => {
        dispatch(
          enqueueSnackbarAction({
            key: new Date().getTime() + Math.random(),
            message: createSharing.error?.message || 'Tạo bài viết không thành công',
            variant: 'error',
          }),
        );
      },
    });
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Thêm bài viết</h2>
        </Grid>
      </Grid>
      <Grid>
        <h3>Thông tin bài viết</h3>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="title"
            value={values.title}
            onChange={handleInputChange}
            type="text"
            fullWidth
            variant="outlined"
            label="Tiêu đề"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            value={values.description}
            onChange={handleInputChange}
            type="text"
            fullWidth
            variant="outlined"
            label="Nội dung"
            multiline
            rows={3}
          />
        </Grid>
        <Grid className={classes.container} item xs={12}>
          <Button className={classes.buttonUpload} variant="contained" component="label">
            UPLOAD FILE
            <input name="img" accept="image/*" type="file" onChange={handleChangeImage} hidden />
          </Button>
          {newImageURL && <img src={newImageURL} alt="Image" width="100px" />}
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
        <br />
        <Grid container justifyContent="flex-end" className="my-20">
          <Button onClick={() => resetForm()} color="primary">
            Add More
          </Button>
        </Grid>
        <Grid container item sm={12} md={12} justifyContent="flex-end">
          <Button variant="outlined" color="primary" className="mr-20" onClick={() => navigate(PATH_NAME.SHARING_LIST)}>
            Return to listpost
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={values.title === '' || values.description === '' || newImageURL === '' || values.link === ''}
          >
            {createSharing.isLoading
              ? 'CREATING...'
              : createSharing.isError
              ? createSharing.error.message
              : createSharing.isSuccess
              ? 'CREATED!'
              : 'CREATE POST'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default SharingAdd;
