import { produce } from 'immer';
import { IListPostState, IPostActionCreator, IPostActionTypes } from 'models/IPostState';

const initialState: IListPostState = {
  listPost: [
    {
      title: 'Post1',
      content:
        '<p>This is the initial content of the editor.</p>\n<p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://lucloi.vn/wp-content/uploads/2021/03/Untitled-1.jpg" width="524" height="295"></p>\n<h2 style="text-align: center;">Welcome to the TinyMCE Cloud demo!</h2>\n<h5 style="text-align: center;">Note, this includes some "enterprise/premium" features.<br>Visit the <a href="pricing" aria-invalid="true">pricing page</a> to learn more about our premium plugins.</h5>\n<p>Please try out the features provided in this full featured example.</p>\n<h2>Got questions or need help?</h2>\n<ul>\n<li>Our <a class="mceNonEditable" href="http://localhost:3000/" aria-invalid="true">documentation</a> is a great resource for learning how to configure TinyMCE.</li>\n<li>Have a specific question? Try the <a href="https://stackoverflow.com/questions/tagged/tinymce" target="_blank" rel="noopener"><code>tinymce</code> tag at Stack Overflow</a>.</li>\n<li>We also offer enterprise grade support as part of <a href="pricing" aria-invalid="true">TinyMCE premium subscriptions</a>.</li>\n</ul>\n<h2>A simple table to play with</h2>\n<table style="border-collapse: collapse; width: 100%;" border="1">\n<thead>\n<tr>\n<th>Product</th>\n<th>Cost</th>\n<th>Really?</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>TinyMCE Cloud</td>\n<td>Get started for free</td>\n<td>YES!</td>\n</tr>\n<tr>\n<td>Plupload</td>\n<td>Free</td>\n<td>YES!</td>\n</tr>\n</tbody>\n</table>\n<h2>Found a bug?</h2>\n<p>If you think you have found a bug please create an issue on the <a href="https://github.com/tinymce/tinymce/issues">GitHub repo</a> to report it to the developers.</p>\n<h2>Finally ...</h2>\n<p>Don\'t forget to check out our other product <a href="http://www.plupload.com" target="_blank" rel="noopener">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.</p>\n<p>Thanks for supporting TinyMCE! We hope it helps you and your users create great content.<br>All the best from the TinyMCE team.</p>',
      author: 'Webdevstudio',
      description:
        'Founded in 2019 with only 20 members. After 3-year of development, our academic club has became the  most developed club of Unviersity of Information  Technology - UIT, VNU, HCM.. ',
      createdAt: '2018-09-28T10:55:51.603Z',
    },
    {
      title: 'Post2',
      content:
        '<p>Founded in 2019 with only 20 members. After 3-year&nbsp;<br>&nbsp;of development, our academic club has became the<br>most developed club of Unviersity of Information<br>Technology - UIT, VNU, HCM..&nbsp;</p>',
      author: 'Webdevstudio',
      description:
        'Founded in 2019 with only 20 members. After 3-year of development, our academic club has became the  most developed club of Unviersity of Information  Technology - UIT, VNU, HCM.. ',
      createdAt: '2018-09-28T10:55:51.603Z',
    },
    {
      title: 'Post3',
      content:
        '<p>Founded in 2019 with only 20 members. After 3-year&nbsp;<br>&nbsp;of development, our academic club has became the<br>most developed club of Unviersity of Information<br>Technology - UIT, VNU, HCM..&nbsp;</p>',
      author: 'Webdevstudio',
      description:
        'Founded in 2019 with only 20 members. After 3-year of development, our academic club has became the  most developed club of Unviersity of Information  Technology - UIT, VNU, HCM.. ',
      createdAt: '2018-09-28T10:55:51.603Z',
    },
    {
      title: 'Post4',
      content:
        '<p>Founded in 2019 with only 20 members. After 3-year&nbsp;<br>&nbsp;of development, our academic club has became the<br>most developed club of Unviersity of Information<br>Technology - UIT, VNU, HCM..&nbsp;</p>',
      author: 'Webdevstudio',
      description:
        'Founded in 2019 with only 20 members. After 3-year of development, our academic club has became the  most developed club of Unviersity of Information  Technology - UIT, VNU, HCM.. ',
      createdAt: '2018-09-28T10:55:51.603Z',
    },
    {
      title: 'Post5',
      content:
        '<p>Founded in 2019 with only 20 members. After 3-year&nbsp;<br>&nbsp;of development, our academic club has became the<br>most developed club of Unviersity of Information<br>Technology - UIT, VNU, HCM..&nbsp;</p>',
      author: 'Webdevstudio',
      description:
        'Founded in 2019 with only 20 members. After 3-year of development, our academic club has became the  most developed club of Unviersity of Information  Technology - UIT, VNU, HCM.. ',
      createdAt: '2018-09-28T10:55:51.603Z',
    },
  ],
};

const reducer = (state = initialState, { type, payload }: IPostActionCreator) => {
  return produce(state, (draft) => {
    switch (type) {
      case IPostActionTypes.FETCH_POST:
        draft.listPost = payload.listPost;
        break;
      //   case IPostActionTypes.LOGIN_FAILURE:
      //     draft.user = null;
      //     break;
      //   case IPostActionTypes.LOGOUT:
      //     draft = initialState;
      //     break;
      //   case IPostActionTypes.SILENT_LOGIN:
      //     draft.user = payload.user;
      //     draft.role = payload.role;
      //     break;
      default:
        break;
    }
  });
};

export default reducer;
