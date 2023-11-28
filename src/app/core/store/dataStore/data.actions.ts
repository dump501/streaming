import Channel from '@app/data/schema/Channel';
import { createAction, props } from '@ngrx/store';

export const setChannelShow = createAction(
  '[Data Component] setChannelShow',
  props<Channel>()
);
