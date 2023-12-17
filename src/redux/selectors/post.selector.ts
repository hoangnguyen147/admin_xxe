import { createSelector } from 'reselect';

// types
import IRootState from 'models/IRootState';

export const listPostSelector = createSelector(
  (state: IRootState) => state.post,
  (app) => app.listPost,
);
