/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

// styles
import useStyles from './styles';

// material-ui
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// state
import { IPostState } from 'models/IPostState';

// tinymcd
import { Editor } from '@tinymce/tinymce-react';

// hook
import useCreatePost from 'hooks/useCreatePost';

// react-router-dom
import { useNavigate } from 'react-router';

// configs
import { PATH_NAME } from 'configs';

// utils
import { findFilename } from 'utils/findFileName';

// react-redux
import { useDispatch } from 'react-redux';

// alert
import { enqueueSnackbarAction } from 'redux/actions/app.action';

// api
import { uploadImage, deleteImage } from 'apis/image.api';

function PostAdd() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createPost = useCreatePost();
  const [newImageURL, setNewImageURL] = useState<string>('');
  const [loadingEditor, setLoadingEditor] = useState<boolean>(true);
  const [values, setValues] = useState<IPostState>({
    title: '',
    content: '',
    thumbnail: '',
    description: '',
  });
  useEffect(() => {
    return () => {
      newImageURL && URL.revokeObjectURL(newImageURL);
    };
  }, [newImageURL]);
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;
  const resetForm = () => {
    setValues({
      title: '',
      content: '',
      thumbnail: '',
      description: '',
    });
    setNewImageURL('');
    createPost.reset();
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

  const handleSubmit = async () => {
    console.log(values);
    createPost.mutate(values, {
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
            message: createPost.error?.message || 'Tạo bài viết không thành công',
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
            label="Mô tả bài viết"
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
          {loadingEditor && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
              <p style={{ margin: '1rem' }}>LOADING...</p>
            </Box>
          )}

          <Editor
            value={values.content}
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            onInit={() => {
              setLoadingEditor(false);
            }}
            init={{
              plugins:
                'preview powerpaste casechange importcss  searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap tinycomments mentions linkchecker emoticons advtable export',
              mobile: {
                plugins:
                  'preview powerpaste casechange importcss  searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker help formatpainter pageembed charmap mentions linkchecker emoticons advtable',
              },
              menu: {
                tc: {
                  title: 'Comments',
                  items: 'addcomment showcomments deleteallconversations',
                },
              },
              menubar: 'file edit view insert format tools table tc help',
              toolbar:
                'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
              toolbar_sticky: true,
              toolbar_sticky_offset: isSmallScreen ? 102 : 108,
              image_advtab: true,
              link_list: [
                { title: 'My page 1', value: 'https://www.tiny.cloud' },
                { title: 'My page 2', value: 'http://www.moxiecode.com' },
              ],

              importcss_append: true,
              height: 600,
              image_caption: true,
              quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
              noneditable_class: 'mceNonEditable',
              toolbar_mode: 'sliding',
              spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
              tinycomments_mode: 'embedded',
              content_style: '.mymention{ color: gray; }',
              contextmenu: 'link image editimage table configurepermanentpen',
              a11y_advanced_options: true,
              file_browser_callback_types: 'image',
              file_picker_callback: (callback: any, value: any, meta: any) => {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();
                input.onchange = async function () {
                  const file = (input.files as FileList)[0];
                  const formdata = new FormData();
                  formdata.append('image', file);
                  const res: any = await uploadImage(formdata);
                  console.log('upload image success: ', `${process.env.REACT_APP_ENDPOINT_URL}/uploads/images/${res.filename}`);
                  callback(`${process.env.REACT_APP_ENDPOINT_URL}/uploads/images/${res.filename}`, { alt: res.filename });
                };
              },
              setup(editor) {
                editor.on('KeyDown', function (e) {
                  if ((e.keyCode === 8 || e.keyCode === 46) && editor.selection) {
                    // delete & backspace keys
                    const selectedNode = editor.selection.getNode(); // get the selected node (element) in the editor

                    if (selectedNode && selectedNode.nodeName === 'IMG') {
                      const image = selectedNode as HTMLImageElement;
                      deleteImage(findFilename(image.src))
                        .then(() => {
                          console.log('delete image success');
                        })
                        .catch(() => {
                          console.log('delete image fail');
                        });
                    }
                  }
                });
              },
            }}
            onEditorChange={(newValue, editor) => {
              console.log(newValue);
              setValues({ ...values, content: newValue });
            }}
          />
        </Grid>

        <br />
        <Grid container justifyContent="flex-end" className="my-20">
          <Button onClick={() => resetForm()} color="primary">
            Add More
          </Button>
        </Grid>
        <Grid container item sm={12} md={12} justifyContent="flex-end">
          <Button variant="outlined" color="primary" className="mr-20" onClick={() => navigate(PATH_NAME.POST_LIST)}>
            Return to listpost
          </Button>
          <Button onClick={() => handleSubmit()} color="primary" variant="contained">
            {createPost.isLoading
              ? 'CREATING...'
              : createPost.isError
              ? createPost.error.message
              : createPost.isSuccess
              ? 'CREATED!'
              : 'CREATE POST'}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default PostAdd;
