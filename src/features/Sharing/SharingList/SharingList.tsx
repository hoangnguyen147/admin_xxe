import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';

// atomic
import PaginationBase from 'components/molecules/PaginationBase';

// configs
import { PATH_NAME } from 'configs';

// helpers
import { canAction } from 'helpers';

// hooks
import usePagination from 'hooks/usePagination';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import { useSharings } from 'hooks/useSharings';
import useDeleteSharing from 'hooks/useDeleteSharing';
import useTogglePublicSharing from 'hooks/useTogglePublicSharing';
// loader
import CircularIndeterminate from 'components/atoms/Progress';

// modal
import EditPostModal from '../components/EditPostModal';

// alert confirm
// import AlertConfirm from 'components/molecules/AlertBase';
import { enqueueSnackbarAction } from 'redux/actions/app.action';

function SharingList() {
  const sharingsQuery = useSharings();
  const deleteSharing = useDeleteSharing();
  const toggleSharing = useTogglePublicSharing();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page, perPage, _changePage, _changePerPage } = usePagination();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [item, setItem] = useState('');

  const searchContent = useSelector(searchSelector);

  const handleEdit = (item: any) => {
    setItem(item);
    setIsEdit(true);
  };

  const filterData =
    sharingsQuery.data &&
    sharingsQuery.data.filter((item: any) => {
      return item.title.toLowerCase().includes(searchContent.toLowerCase());
    });
  if (sharingsQuery.isLoading) return <CircularIndeterminate />;
  if (sharingsQuery.isError) return <p>{sharingsQuery.error.message}</p>;
  if (sharingsQuery.isSuccess)
    return (
      <div>
        {canAction('create', 'product') ? (
          <Grid container justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate(PATH_NAME.SHARING_ADD)}
            >
              Thêm bài viết
            </Button>
          </Grid>
        ) : null}
        <br />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="center">Tiêu đề</TableCell>
                <TableCell align="center">Nội dung</TableCell>
                <TableCell align="center">Tác giả</TableCell>
                <TableCell align="center">Hình ảnh</TableCell>
                <TableCell align="center">Link</TableCell>
                <TableCell align="center">Công khai</TableCell>
                <TableCell align="center">Công cụ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData &&
                filterData?.slice((page - 1) * perPage, page * perPage).map((row: any, index: number) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {(page - 1) * perPage + index + 1}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.user.fullname}</TableCell>
                    <TableCell align="center">
                      <img
                        src={`${process.env.REACT_APP_ENDPOINT_URL}/uploads/images/${row.thumbnail}`}
                        alt={row.title}
                        width="100px"
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ maxWidth: '250px' }}>
                      <Link href={row.link} target="_blank" underline="hover" sx={{ overflowWrap: 'break-word' }}>
                        {row.link}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={row.isPublic}
                        onClick={() => {
                          toggleSharing.mutate(row.id, {
                            onSuccess: () => {
                              dispatch(
                                enqueueSnackbarAction({
                                  key: new Date().getTime() + Math.random(),
                                  message: `Đã chuyển ${row.title} sang ${row.isPublic ? 'không công khai' : 'công khai'}`,
                                  variant: 'info',
                                }),
                              );
                            },
                            onError: () => {
                              dispatch(
                                enqueueSnackbarAction({
                                  key: new Date().getTime() + Math.random(),
                                  message: `Chuyển sang ${row.isPublic ? 'không công khai' : 'công khai'} không thành công`,
                                  variant: 'error',
                                }),
                              );
                            },
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Grid container>
                        <Grid item xs={6}>
                          <Tooltip title="Chỉnh sửa">
                            <IconButton color="primary" aria-label="edit post" component="span" onClick={() => handleEdit(row)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                        <Grid item xs={6}>
                          <Tooltip title="Xóa">
                            <IconButton
                              aria-label="delete post"
                              component="span"
                              onClick={() =>
                                deleteSharing.mutate(row.id, {
                                  onSuccess: () => {
                                    dispatch(
                                      enqueueSnackbarAction({
                                        key: new Date().getTime() + Math.random(),
                                        message: `Xóa "${row.title}" thành công`,
                                        variant: 'success',
                                      }),
                                    );
                                  },
                                  onError: () => {
                                    dispatch(
                                      enqueueSnackbarAction({
                                        key: new Date().getTime() + Math.random(),
                                        message: 'Xóa không thành công',
                                        variant: 'error',
                                      }),
                                    );
                                  },
                                })
                              }
                            >
                              <DeleteForever style={{ color: 'tomato' }} />
                            </IconButton>
                          </Tooltip>
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
          totalPage={Math.ceil(sharingsQuery.data && sharingsQuery.data.length / perPage)}
          changePage={_changePage}
          changePerPage={_changePerPage}
        />

        <EditPostModal isOpen={isEdit} handleClose={() => setIsEdit(false)} data={item} />
      </div>
    );
  return <p style={{ display: 'flex', justifyContent: 'center' }}>Oops...Page hỏng rồi ban eiii...</p>;
}

export default SharingList;
