import AuthDetail from '@app/data/schema/AuthDetail';
import { createAction, props } from '@ngrx/store';

export const setUserDetails = createAction(
  '[Auth Component] setUserDetails',
  props<AuthDetail>()
);
export const logout = createAction('[Auth Component] logout');
