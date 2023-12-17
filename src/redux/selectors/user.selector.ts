import { createSelector } from 'reselect';

// types
import IRootState from 'models/IRootState';

export const listUserSelector = createSelector(
  (state: IRootState) => state.user,
  (app) => app.listUser,
);

export const isLoadingListUserSelector = createSelector(
  (state: IRootState) => state.user,
  (app) => app.isLoading,
);
