import { Actions, Action } from "./actionTypes";
import { ChannelModel } from "../types/ChannelModel";

export const selectChannel = (
  channel: ChannelModel,
  dispatch: (action: Action, payload?: any) => void
) => {
  dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
};

export const setUser = (
  user: { id: string; name: string; status: string; username: string },
  dispatch: (action: Action, payload?: any) => void
) => {
  dispatch({ type: Actions.USER, payload: user });
};
