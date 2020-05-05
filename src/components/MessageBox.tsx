import * as React from 'react';
import styled from 'styled-components';
import { Spinner } from './utility/Spinner'
import { MessageModel } from '../types/MessageModel'

const Container = styled.div`
  margin-top: 85px;
  overflow-y: auto;
  height: calc(100vh - 185px);
  width: 90vw;
  li {
    margin: 0.5rem 0;
  }
  p {
    margin-top: 0.25rem;
  }
`;

const Username = styled.span`
  font-weight: 800;
  margin-right: 5px;
  font-size: 1.2rem;
`;

const DateSpan = styled.span`
  color: darkgrey;
`;

const defaultMessageList: MessageModel[] = [
  {
    message: '',
    user: '',
    date: ''
  }
]

export function MessageBox() {
  const messageListRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    (messageListRef && messageListRef.current) && messageListRef.current!.scrollTo(
      messageListRef.current!.scrollTop,
      messageListRef.current!.scrollHeight
    );
  }, [messageListRef]);

  const [messages, setMessages] =  React.useState(defaultMessageList)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetch(
      `https://jh1yx4w8z9.execute-api.us-east-1.amazonaws.com/dev/channels/4fb0e5b7-dc90-4872-ba98-ef886c8ff984/messages`,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(response => {
        setMessages(response)
        setIsLoading(false)
      })
      .catch(error => console.log(error));
  }, []);

  if(isLoading){
    return <Spinner/>
  }
  return (
    <Container ref={messageListRef}>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <Username>{message.user}</Username>
            <DateSpan>
              {new Intl.DateTimeFormat('en-GB').format(new Date(message.date))}
            </DateSpan>
            <p>{message.message}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}