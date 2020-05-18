
import { ChannelModel } from "../types/ChannelModel";

export enum Actions {
    "SELECTED_CHANNEL",
    "USER",
  }

export type SelectedChannelAction = {
  type: Actions.SELECTED_CHANNEL;
  payload: ChannelModel;
};

export type UserAction = { type: Actions.USER; payload: { id: string, name: string, status: string, username: string, authId?: string} };

export type Action = SelectedChannelAction | UserAction;
