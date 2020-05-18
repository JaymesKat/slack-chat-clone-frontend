import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "./utility/Spinner";
import { StoreContext } from "../store/store";
import { selectChannel } from "../store/actions";
import { CreateChannel } from "./CreateChannel";
import { JoinChannel } from "./JoinChannel";
import { fetchUserChannels } from "../api/channels";

const ChannelsTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  cursor: pointer;
  h2 {
    font-size: 1rem;
    cursor: auto;
  }
`;

const ChannelItem = styled.li`
  margin: 0.25rem 0;
  cursor: pointer;

  strong {
    font-weight: bold;
  }
`;

const Button = styled.button`
  background-color: transparent;
  padding: 5px;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  &.channel-button {
    margin-top: 1rem;
    i {
      margin-right: 5px;
    }
  }
`;

export function Channels() {
  const [channels, setChannels] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isCreateChannelModalOpen, setCreateChannelModalOpen] = React.useState(
    false
  );
  const [isJoinChannelModalOpen, setJoinChannelModal] = React.useState<boolean>(
    false
  );

  const { selectedChannel, dispatch, user } = React.useContext(StoreContext);

  React.useEffect(() => {
    setIsLoading(true);
    fetchChannelsData();
    setIsLoading(false);
  }, [isCreateChannelModalOpen, isJoinChannelModalOpen, user]);

  const fetchChannelsData = async () => {
    if (user) {
      const response = await fetchUserChannels(user.id);
      setChannels(response);
      if(!selectedChannel){
        selectChannel(response[0], dispatch);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      {isCreateChannelModalOpen ? (
        <CreateChannel exitCallback={() => setCreateChannelModalOpen(false)} />
      ) : null}
      {isJoinChannelModalOpen ? (
        <JoinChannel exitCallback={() => setJoinChannelModal(false)} />
      ) : null}
      <ChannelsTitles>
        <h2>Channels</h2>
        <FontAwesomeIcon
          icon='plus'
          onClick={() => setCreateChannelModalOpen(true)}
        />
      </ChannelsTitles>
      {isLoading && <Spinner />}
      {!isLoading && (
        <ul>
          {channels.length > 0 &&
            channels.map((channel) => {
              const channelName =
                selectedChannel && channel["id"] === selectedChannel.id ? (
                  <strong> {channel["name"]} </strong>
                ) : (
                  channel["name"]
                );
              return (
                <ChannelItem
                  onClick={() => selectChannel(channel, dispatch)}
                  key={channel["id"]}
                >
                  # {channelName}
                </ChannelItem>
              );
            })}
        </ul>
      )}

      <Button
        className='channel-button'
        onClick={() => setJoinChannelModal(true)}
      >
        {" "}
        <FontAwesomeIcon icon='plus' /> Add channel
      </Button>
    </>
  );
}
