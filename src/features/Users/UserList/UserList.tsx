/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { searchSelector } from 'redux/selectors/app.selector';

// material core
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
// atomic
import PaginationBase from 'components/molecules/PaginationBase';
import CircularIndeterminate from 'components/atoms/Progress';

// configs
import { PATH_NAME } from 'configs';

// helpers
import { canAction } from 'helpers';

// hooks
import usePagination from 'hooks/usePagination';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import EditUserModal from '../components/EditUserModal';

//  image_
import img from '../assets/img.png';

// styles
import useStyles from './styles';

//  hooks
import { useUsers, useUsersCount } from 'hooks/useUsers';

function UserList() {
  const usersQuery = useUsers();
  const userCountQuery = useUsersCount();
  const classes = useStyles();
  const navigate = useNavigate();
  const { page, perPage, _changePage, _changePerPage } = usePagination();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [item, setItem] = useState('');
  const searchContent = useSelector(searchSelector);

  const handleEdit = (user: any) => {
    setItem({ ...user, avatar: img });
    setIsEdit(true);
  };

  const filterData =
    usersQuery.data &&
    usersQuery.data.filter((item: any) => {
      return (item?.username?.toLowerCase() || '').includes(searchContent?.toLowerCase() || '');
    });
  if (usersQuery.isLoading) return <CircularIndeterminate />;
  if (usersQuery.isError) return <div>{usersQuery.error.message}</div>;
  if (usersQuery.isSuccess)
    return (
      <div>
        {canAction('create', 'product') ? (
          <Grid container justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate(PATH_NAME.USER_ADD)}
            >
              Thêm Uer
            </Button>
          </Grid>
        ) : null}
        <br />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Tên đầy đủ</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Avatar</TableCell>
                <TableCell align="center">Số điện thoại</TableCell>
                <TableCell align="center">Công cụ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData &&
                filterData?.slice((page - 1) * perPage, page * perPage).map((row: any, index: number) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.fullname}</TableCell>
                    <TableCell align="center">
                      <div
                        className={`${classes.roleContainer} ${
                          row.role === 'master'
                            ? classes.roleMaster
                            : row.role === 'admin'
                            ? classes.roleAdmin
                            : row.role === 'editor'
                            ? classes.roleEditor
                            : classes.roleUser
                        }`}
                      >
                        {row.role}
                      </div>
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      <img
                        src={`${process.env.REACT_APP_ENDPOINT_URL}/uploads/avatar/${row.avatar}`}
                        alt={row.username}
                        width="100px"
                      />
                    </TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">
                      <Grid container>
                        <Grid item xs={6}>
                          <IconButton color="primary" aria-label="edit post" component="span" onClick={() => handleEdit(row)}>
                            <EditIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton aria-label="delete post" component="span">
                            <DeleteForever style={{ color: 'tomato' }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationBase
          pageIndex={page}
          perPage={perPage}
          totalPage={Math.ceil(usersQuery.data && usersQuery.data.length / perPage)}
          changePage={_changePage}
          changePerPage={_changePerPage}
        />
        <EditUserModal isOpen={isEdit} handleClose={() => setIsEdit(false)} data={item} />
      </div>
    );
  return <p style={{ display: 'flex', justifyContent: 'center' }}>Oops...Page hỏng rồi ban eiii...</p>;
}

export default UserList;
