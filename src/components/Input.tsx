import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SubmitButton = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
  border-left: ${props => `3px solid darkgrey`};
  position: fixed;
  box-sizing: border-box;
  padding: 1rem;
  font-size: 1rem;
  right: 15px;
  bottom: 13px;
  cursor: pointer;
`;

const InputStyle = styled.input`
padding: 1rem;
border-radius: 7px;
border: 3px solid darkgrey;
font-size: 1rem;
outline: none;
&:hover,
&:active,
&:focus {
  border: 3px solid dimgrey;
  & + ${SubmitButton} {
    border-left: 3px solid dimgrey;
  }
}
box-sizing: border-box;
position: fixed;
bottom: 10px;
width: calc(100vw - 220px);
`;

export function InputMessage() {
  const [inputValue, setInputValue] = React.useState('');
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  return (
    <form>
        <InputStyle
            name="message"
            onChange={onChangeInput}
            type="text"
            placeholder="Message John Doe"
          />
          <SubmitButton type="submit" disabled={inputValue === ''} >
            {<FontAwesomeIcon icon="arrow-alt-circle-right"/>}
          </SubmitButton>
    </form>
  )
}