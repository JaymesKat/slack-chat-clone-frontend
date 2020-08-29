import * as React from "react";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "./utility/Spinner";
import { MessageModel } from "../types/MessageModel";
import { StoreContext } from "../store/store";
import { ImagePreview, Button } from "./ImagePostPreview";
import { ExitButtonContainer, ButtonClose } from "./CreateChannel";
import { fetchMessages, editMessage, deleteMessage } from "../api/messages";

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

const Message = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 5%;
  padding: 10px 0px;
  &:hover {
    svg {
      display: flex;
      cursor: pointer;
    }
  }
  .right {
    margin-left: auto;
  }

  svg {
    display: none;
    margin: 0 10px;
  }
`;

const Form = styled.form`
  position: absolute;
  width: 50em;
  height: 30em;
  border: 2px solid #000;
  padding: 16px 40px 24px;
  position: absolute;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  border-radius: 2px;
  top: 25%;
  left: 25%;

  h2 {
    color: rgba(0, 0, 0, 0.87);
    font-size: 1.2rem;
    font-weight: bold;
  }

  p {
    margin: 2em 0;
  }
`;

const MessageInput = styled.input`
  margin: 5px 10px 5px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
`;

export function MessageBox() {
  const { user, selectedChannel } = React.useContext(StoreContext);

  const [messages, setMessages] = React.useState([] as MessageModel[]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [messageToDelete, setMessageToDelete] = React.useState({
    messageId: "",
    message: "",
  });
  const [editedMessage, setEditedMessage] = React.useState({
    messageId: "",
    channelId: "",
    message: "",
  });

  const [editFormValid, setEditFormValid] = React.useState(false);
  const [updatingMessage, setUpdatingMessage] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const addNewMessage = (message: MessageModel) => {
    const newMessages = [...messages, message];
    setMessages(newMessages);
  };

  React.useEffect(() => {
    if (selectedChannel) {
      setIsLoading(true);
      fetchMessageList();
      setIsLoading(false);
    }
  }, [selectedChannel]);

  const ws: any = React.useRef(null);

  React.useEffect(() => {
    ws.current = new WebSocket(
      "wss://xx9p3scloj.execute-api.us-east-1.amazonaws.com/dev"
    );
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);

  React.useEffect(() => {
    ws.current.onmessage = (e: any) => {
      const message = JSON.parse(e.data);
      addNewMessage(message);
    };
  }, [messages]);

  const messageListRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    messageListRef &&
      messageListRef.current &&
      messageListRef.current!.scrollTo(
        messageListRef.current!.scrollTop,
        messageListRef.current!.scrollHeight
      );
  }, [messageListRef]);

  const fetchMessageList = async () => {
    const messages = await fetchMessages(selectedChannel.id);
    setMessages(messages);
  };

  const validateForm = () => {
    return editedMessage.message.length > 0;
  };

  const handleEditOpen = (message: MessageModel) => {
    setEditedMessage(message);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const handleDeleteOpen = (messageId: string, message: string) => {
    setMessageToDelete({ messageId, message });
    setDeleteModalOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteModalOpen(false);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEditedMessage({
      ...editedMessage,
      message: (e.target as any).value,
    });
    setEditFormValid(validateForm());
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUpdatingMessage(true);
    const { messageId, channelId, message } = editedMessage;
    await editMessage(channelId, messageId, message);
    setUpdatingMessage(false);

    handleEditClose();
    fetchMessageList();
  };

  const handleDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDeleting(true);
    await deleteMessage(selectedChannel.id, messageToDelete.messageId);
    setDeleting(false);

    handleDeleteClose();
    fetchMessageList();
  };

  const editform = (
    <Form onSubmit={handleEditSubmit}>
      <ExitButtonContainer>
        <ButtonClose onClick={handleEditClose}>
          <FontAwesomeIcon icon='times-circle' />
        </ButtonClose>
      </ExitButtonContainer>
      <h2 id='title'>Edit Message</h2>
      <MessageInput
        type='text'
        id='message'
        onChange={handleInputChange}
        value={editedMessage.message || ""}
      />
      <Button onClick={handleEditClose}>Cancel</Button>
      <Button type='submit' disabled={!editFormValid || updatingMessage}>
        {updatingMessage && <FontAwesomeIcon icon='spinner' pulse />}
        {updatingMessage && "Updating..."}
        {!updatingMessage && "Update"}
      </Button>
    </Form>
  );

  const deleteForm = (
    <Form onSubmit={(e) => handleDeleteSubmit(e)}>
      <ExitButtonContainer>
        <ButtonClose onClick={handleDeleteClose}>
          <FontAwesomeIcon icon='times-circle' />
        </ButtonClose>
      </ExitButtonContainer>
      <h2 id='title'>Delete Message</h2>
      <p>Are you sure you want to delete this message?</p>
      <p>
        <strong>{`"${messageToDelete.message}"`}</strong>
      </p>
      <Button onClick={handleDeleteClose}>Cancel</Button>
      <Button type='submit' style={{ color: "red" }} disabled={deleting}>
        {deleting && <FontAwesomeIcon icon='spinner' pulse />}
        {deleting && "Deleting..."}
        {!deleting && "Delete"}
      </Button>
    </Form>
  );

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Container ref={messageListRef}>
      {messages.length < 1 && "No messages"}
      <ul>
        {messages &&
          messages.map((message, index) => (
            <li key={index}>
              <Username>{message.user.username}</Username>
              <DateSpan>
                {new Intl.DateTimeFormat("en-GB").format(
                  Date.parse(message.createdAt)
                )}
              </DateSpan>
              <Message>
                <span>{message.message}</span>
                {user && message.user.id === user.id ? (
                  <>
                    <FontAwesomeIcon
                      className='right'
                      icon='pencil-alt'
                      title='Edit'
                      onClick={() => handleEditOpen(message)}
                      color='dimgrey'
                    />
                    <FontAwesomeIcon
                      icon='trash'
                      color='red'
                      title='Delete'
                      onClick={() =>
                        handleDeleteOpen(message.messageId, message.message)
                      }
                    />
                  </>
                ) : (
                  ""
                )}
              </Message>
              {message.imageUrl && (
                <ImagePreview>
                  <img src={message.imageUrl} alt='upload' />
                </ImagePreview>
              )}
            </li>
          ))}
      </ul>
      <Modal open={editModalOpen} onClose={handleEditClose}>
        {editform}
      </Modal>
      <Modal open={deleteModalOpen} onClose={handleDeleteClose}>
        {deleteForm}
      </Modal>
    </Container>
  );
}
