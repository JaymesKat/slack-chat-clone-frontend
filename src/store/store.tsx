import * as React from "react";
import { initialChannel, initialUser } from "../libs/storage";
import { Actions, Action } from "./actionTypes";
import { ChannelModel } from "../types/ChannelModel";
import { UserModel } from "../types/UserModel";

const initialStoreValue = {
  selectedChannel: initialChannel,
  user: initialUser,
};

export const StoreContext = React.createContext<Context>({
  ...initialStoreValue,
  dispatch: () => "",
});

interface State {
  selectedChannel: ChannelModel;
  user: UserModel;
}

interface Context extends State {
  dispatch: (action: Action, payload?: any) => void;
}

function storeReducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.SELECTED_CHANNEL:
      return { ...state, selectedChannel: action.payload };
    case Actions.USER:
      return { ...state, user: action.payload };
    default:
      throw new Error();
  }
}

interface Props {
  children: React.ReactNode;
  user?: any | null;
}


export function StoreContextProvider(props: Props) {
  const [store, dispatch] = React.useReducer(storeReducer, initialStoreValue);

  React.useEffect(() => {
    localStorage.setItem(
      "selected_channel",
      JSON.stringify(store.selectedChannel)
    );
  }, [store.selectedChannel]);

  React.useEffect(() => {
    if (props.user) {
      dispatch({ type: Actions.USER, payload: props.user });
    }
  }, [props.user]);

  return (
    <StoreContext.Provider value={{ ...store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}
