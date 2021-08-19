import { Action, createReducer, on } from '@ngrx/store';
import { PageState } from './page-state';
import { change } from './page.actions';

export const initialState: PageState = {
  page: null,
  params: undefined,
  data: null,
  state: null
};

export const pageReducer = createReducer(
  initialState,
  on(change, (_state: PageState, payload: PageState) => payload)
);