import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { IUserState } from 'models/IUserState';
import MenuItem from '@mui/material/MenuItem';

// styles
import useStyles from './styles';

type IProps = {
  isOpen: boolean;
  handleClose: () => void;
  data: any;
};

const currencies = [
  {
    value: 'master',
    label: 'master',
  },
  {
    value: 'admin',
    label: 'admin',
  },
  {
    value: 'editor',
    label: 'editor',
  },
  {
    value: 'user',
    label: 'user',
  },
];

export default function EditUserModal({ isOpen, handleClose, data }: IProps) {
  const classes = useStyles();

  const [values, setValues] = useState<IUserState>({
    username: '',
    fullname: '',
    role: '',
    email: '',
    avatar: '',
    phone: '',
  });
  const [newImageURL, setNewImageURL] = useState<string>('');

  useEffect(() => {
    setValues(data);
    setNewImageURL('');
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
      avatar: file,
    });
    setNewImageURL(URL.createObjectURL(file));
  };
  const handleSubmit = () => {
    console.log(values);
    handleClose();
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={isOpen} aria-labelledby="max-width-dialog-title">
        <DialogContent>
          <Typography variant="h5" color="textPrimary">
            Sửa user
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                value={values.username}
                onChange={handleInputChange}
                fullWidth
                id="username"
                label="Username"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="fullname"
                value={values.fullname}
                onChange={handleInputChange}
                fullWidth
                id="fullname"
                label="Tên đầy đủ"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="role"
                value={values.role}
                onChange={handleInputChange}
                fullWidth
                id="role"
                label="Role"
                variant="outlined"
                select
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                value={values.email}
                onChange={handleInputChange}
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
            <Grid className={classes.container} item xs={12}>
              <Button className={classes.buttonUpload} variant="contained" component="label">
                Upload File
                <input name="img" accept="image/*" type="file" onChange={handleChangeImage} hidden />
              </Button>
              <img src={newImageURL ? `${newImageURL}` : `${values.avatar}`} alt={data.username} width="100px" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                value={values.phone}
                onChange={handleInputChange}
                fullWidth
                id="phone"
                label="Số điện thoại"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
          <Button onClick={() => handleSubmit()} variant="contained" color="primary" size="small">
            Sửa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
