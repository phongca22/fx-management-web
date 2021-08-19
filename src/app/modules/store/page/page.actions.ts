import { createAction, props } from '@ngrx/store';
import { PageState } from './page-state';

export const change = createAction('[Page] Change', props<PageState>());
