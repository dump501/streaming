import { createReducer, on } from '@ngrx/store';
import { logout, setUserDetails } from './auth.actions';

let initState = () => {
  return JSON.parse(localStorage.getItem('authDetails') ?? '{}');
};

export const initialState = initState();

export const authReducer = createReducer(
  initialState,
  on(setUserDetails, (_state, authDetails) => {
    localStorage.setItem('authDetails', JSON.stringify(authDetails));
    return { ...authDetails };
  }),
  on(logout, (_state) => {
    localStorage.setItem('authDetails', '{}');
    return {};
  })
);
