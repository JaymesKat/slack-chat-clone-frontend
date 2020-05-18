import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  message: string;
}

function LoadingIndicator(props: Props) {
  return (
    <Dimmer active>
      <Loader content={props.message} />
    </Dimmer>
  );
}

export default LoadingIndicator;
