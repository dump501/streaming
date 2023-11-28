import Channel from '@app/data/schema/Channel';
import { createReducer, on } from '@ngrx/store';
import { setChannelShow } from './data.actions';

export const initialState = {
  channelShow: new Channel(),
};

export const dataReducer = createReducer(
  initialState,
  on(setChannelShow, (state, channel) => ({ ...state, channelShow: channel }))
);
