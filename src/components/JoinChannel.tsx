import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StoreContext } from "../store/store";
import { ChannelModel } from "../types/ChannelModel";
import { Actions } from "../store/actionTypes";
import { Container, ExitButtonContainer, ButtonClose } from "./CreateChannel";
import { Loader } from "semantic-ui-react";
import { fetchChannels } from "../api/channels";
import { createNewMembership } from "../api/memberships"
interface Props {
  exitCallback: () => void;
}

export const DataItem = styled.div`
  padding: 1rem 2rem;
  border-top: 1px solid lightGrey;
  box-sizing: border-box;
  cursor: pointer;
`;

export const DataContainer = styled.div`
  margin-top: 2rem;
  max-height: calc(100vh - 200px);
  min-height: 0;
  transition: all 0.5 ease-in;
  overflow-y: auto;
  ${DataItem}:last-child {
    border-bottom: 1px solid lightGrey;
  }
`;

export const Form = styled.form`
  max-width: 700px;
  label {
    font-weight: bolder;
    display: block;
    margin: 1rem 0;
  }
  input {
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
  }
`;

export function JoinChannel(props: Props) {
  const { user, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [channels, setChannels] = React.useState([] as any);

  const selectChannel = async (channel: any) => {

    setLoading(true);
    if (
      channel.Memberships.some(
        (membership: any) => membership.userId === user.id
      )
    ) {
      dispatch({
        type: Actions.SELECTED_CHANNEL,
        payload: { ...channel, direct: false },
      });
    } else {
      const membership: any = await createNewMembership(channel.id, user.id);
      let newChannel = membership.channel;
      delete membership.channel
      newChannel['Memberships'] = [membership]
      dispatch({
        type: Actions.SELECTED_CHANNEL,
        payload: newChannel,
      });
    }
    setLoading(false);
    props.exitCallback();
  };

  const fetchChannelData = async () => {
    const channels = await fetchChannels()
    setChannels(channels);
  };

  React.useEffect(() => {
    setLoading(true);
    fetchChannelData();
    setLoading(false);
  }, []);

  return (
    <Container>
      <ExitButtonContainer>
        <ButtonClose onClick={props.exitCallback}>
          <FontAwesomeIcon style={{ display: "block" }} icon='times-circle' />
          esc
        </ButtonClose>
      </ExitButtonContainer>
      <h1>Browse Channel</h1>
      {loading ? (
        <Loader content='Loading' active inverted size='large' />
      ) : (
        <>
          <DataContainer>
            {channels.length > 0 &&
              channels.map((channel: ChannelModel) => (
                <DataItem
                  key={channel.id}
                  onClick={() => selectChannel(channel)}
                >
                  # {channel.name}
                </DataItem>
              ))}
          </DataContainer>
        </>
      )}
    </Container>
  );
}
