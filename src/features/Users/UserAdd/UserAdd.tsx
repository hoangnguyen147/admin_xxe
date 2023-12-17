import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IUserState } from 'models/IUserState';
import MenuItem from '@mui/material/MenuItem';

// styles
import useStyles from './styles';

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

function UserAdd() {
  const classes = useStyles();
  const [newImageURL, setNewImageURL] = useState<string>('');

  const [values, setValues] = useState<IUserState>({
    username: '',
    fullname: '',
    role: '',
    email: '',
    avatar: '',
    phone: '',
  });
  useEffect(() => {
    return () => {
      newImageURL && URL.revokeObjectURL(newImageURL);
    };
  }, [newImageURL]);
  const resetForm = () => {
    setValues({
      username: '',
      fullname: '',
      role: '',
      email: '',
      avatar: '',
      phone: '',
    });
    setNewImageURL('');
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
      avatar: file,
    });
    setNewImageURL(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    console.log(values);
    // resetForm();
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Thêm user</h2>
        </Grid>
      </Grid>
      <Grid>
        <h3>Thông tin user</h3>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="username"
            value={values.username}
            onChange={handleInputChange}
            type="text"
            fullWidth
            variant="outlined"
            label="Username"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="fullname"
            value={values.fullname}
            onChange={handleInputChange}
            type="text"
            fullWidth
            variant="outlined"
            label="Fullname"
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
          />
        </Grid>
        <Grid className={classes.container} item xs={12}>
          <Button className={classes.buttonUpload} variant="contained" component="label">
            Upload File
            <input name="img" accept="image/*" type="file" onChange={handleChangeImage} hidden />
          </Button>
          {newImageURL && <img src={newImageURL} alt="Image" width="100px" />}
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="phone"
            value={values.phone}
            onChange={handleInputChange}
            fullWidth
            id="phone"
            label="Phone"
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
          <Button variant="outlined" color="primary" className="mr-20">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()} color="primary" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default UserAdd;
