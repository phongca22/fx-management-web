import { createReducer, on } from '@ngrx/store';
import { User } from './user';
import { reset, set } from './user.actions';

export const initialState: User = new User({});

export const userReducer = createReducer(
  initialState,
  on(set, (state: User, payload: User) => {
    return { ...state, ...payload } as User;
  }),
  on(reset, () => initialState)
);
