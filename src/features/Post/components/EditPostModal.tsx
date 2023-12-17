/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// styles
import useStyles from '../PostAdd/styles';

// tinymcd
import { Editor } from '@tinymce/tinymce-react';

// utils
import { findFilename } from 'utils/findFileName';

// hooks
import useSavePost from 'hooks/useSavePost';

// api
import { uploadImage, deleteImage } from 'apis/image.api';

type IProps = {
  isOpen: boolean;
  handleClose: () => void;
  data: any;
};

export default function EditPostModal({ isOpen, handleClose, data }: IProps) {
  const classes = useStyles();
  const savePost = useSavePost();
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;
  const [newImageURL, setNewImageURL] = useState<string>('');
  const [loadingEditor, setLoadingEditor] = useState<boolean>(true);

  const [values, setValues] = useState<any>({
    title: '',
    content: '',
    thumbnail: '',
    description: '',
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

  const handleSubmit = async () => {
    await savePost.mutate(values);
    if (newImageURL)
      await deleteImage(data.thumbnail)
        .then(() => {
          console.log('delete old image success');
        })
        .catch(() => {
          console.log('delete old image fail');
        });
    if (savePost.isSuccess)
      setTimeout(() => {
        savePost.reset();
        handleClose();
      }, 1000);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="xl" open={isOpen} aria-labelledby="max-width-dialog-title">
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
                id="title"
                label="Mô tả bài viết"
                variant="outlined"
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
              {loadingEditor && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CircularProgress />
                  <p style={{ margin: '1rem' }}>LOADING...</p>
                </Box>
              )}

              <Editor
                value={values.content}
                onInit={() => {
                  setLoadingEditor(false);
                }}
                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
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
                      console.log(
                        'upload image success: ',
                        `${process.env.REACT_APP_ENDPOINT_URL}/uploads/images/${res.filename}`,
                      );
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={() => handleSubmit()} variant="contained" color="primary" size="small">
            {savePost.isLoading
              ? 'SAVING...'
              : savePost.isError
              ? savePost.error.message
              : savePost.isSuccess
              ? 'SAVED!'
              : 'SAVE POST'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
