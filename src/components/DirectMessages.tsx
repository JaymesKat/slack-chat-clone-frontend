import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Status } from "./Sidebar";
import { Spinner } from "./utility/Spinner";
import { StoreContext } from "../store/store";
import { selectChannel } from "../store/actions";
import { fetchDMChannels } from "../api/channels";

const MessagesTitles = styled.div`
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

const MessageItem = styled.li`
  margin: 0.25rem 0;
  cursor: pointer;
`;

export function DirectMessages() {
  const [channels, setChannels] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { user, dispatch } = React.useContext(StoreContext);

  React.useEffect(() => {
    if (user) {
      setIsLoading(true);
      fetchDMChannels(user.id)
        .then((response) => {
          setChannels(response);
        })
        .catch((error) => console.log(error));
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MessagesTitles>
        <h2>Messages</h2>
        <FontAwesomeIcon icon='plus' />
      </MessagesTitles>
      <ul>
        {channels.length > 0 &&
          channels.map((channel) => (
            <MessageItem
              onClick={() => selectChannel(channel, dispatch)}
              key={channel["id"]}
            >
              <Status /> {channel["name"]}
            </MessageItem>
          ))}
      </ul>
    </>
  );
}
