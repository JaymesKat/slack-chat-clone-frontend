import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Status } from './Sidebar';
import { Spinner } from './utility/Spinner'

const MessagesTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  h2 {
    font-size: 1rem;
  }
`;

const MessageItem = styled.li`
  margin: 0.25rem 0;
`;

export function DirectMessages() {

  const [channels, setChannels] =  React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetch(
      `https://jh1yx4w8z9.execute-api.us-east-1.amazonaws.com/dev/users/230e91f9-cf48-4910-8f39-190fb4830f4d/directmessages`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then((response) => {
        setChannels(response)
        setIsLoading(false)
      })
      .catch(error => console.log(error));
  }, []);

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <MessagesTitles>
        <h2>Messages</h2>
        <FontAwesomeIcon icon="plus"/>
      </MessagesTitles>
      <ul>
        {channels.map(channel => (
          <MessageItem key={channel['id']}>
            <Status /> {channel['name']}
          </MessageItem>
        ))}
      </ul>
    </>
  );
}