import { createSelector } from '@ngrx/store';
import AuthDetail from '@app/data/schema/AuthDetail';

export const selectAuthDetails = (state: { auth: AuthDetail }) => state.auth;

export const isAuthenticated = createSelector(
  selectAuthDetails,
  (authDetails: AuthDetail) => {
    let expirationTime = new Date(authDetails.expiresIn ?? 0);
    if (expirationTime > new Date()) {
      return true;
    }
    return false;
  }
);
