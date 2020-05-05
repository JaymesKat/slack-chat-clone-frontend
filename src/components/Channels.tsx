import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Spinner } from './utility/Spinner'

const ChannelsTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  h2 {
    font-size: 1rem;
  }
`;

const ChannelItem = styled.li`
  margin: 0.25rem 0;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 5px;
  color: white;
  border: none;
  font-size: 1rem;
  &.channel-button {
    margin-top: 1rem;
    i {
      margin-right: 5px;
    }
  }
`;



export function Channels() {

  const [channels, setChannels] =  React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetch(
      `https://jh1yx4w8z9.execute-api.us-east-1.amazonaws.com/dev/users/230e91f9-cf48-4910-8f39-190fb4830f4d/channels`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(response => {
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
      <ChannelsTitles>
        <h2>Channels</h2>
        <FontAwesomeIcon icon="plus"/>
      </ChannelsTitles>
      {
        isLoading && (
           <Spinner/>
        )
      }
      {
        !isLoading && (
          <ul>
          {channels.map(channel => {
            console.log('channel id', channel['id'])
            return <ChannelItem key={channel['id']}># {channel['name']}</ChannelItem>
          })}
        </ul>
        )
      }

      <Button className="channel-button">
        {' '}
        <FontAwesomeIcon icon="plus"/> Add channel
      </Button>
    </>
  );
}