import { createAction, props } from '@ngrx/store';
import { User } from './user';

export const set = createAction('[User] Set', props<User>());
export const reset = createAction('[User] Reset');
export const update = createAction('[User] Update');
