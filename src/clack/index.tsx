import {
  renderCalderaApp,
  useSharedReducer,
  makeSharedResource,
  Head
} from "caldera";
import React, { useState, useMemo } from "react";
import style from "./style";
import MessageBox from "./MessageBox";
import ChatChannel from "./ChatChannel";
import ChannelList from "./ChannelList";

enum Action {
  CREATE_CHANNEL,
  SEND_MESSAGE
}

interface CreateChannelAction {
  type: Action.CREATE_CHANNEL;
  channel: string;
}

interface SendMessageAction {
  type: Action.SEND_MESSAGE;
  channel: string;
  message: string;
}

export interface ClackMessage {
  sender: number;
  contents: string;
}

const clackState = makeSharedResource<Record<string, ClackMessage[]>>({
  general: []
});

// Slack clone - no session persistence
const ClackApp = () => {
  const [self] = useState(() => Math.floor(Math.random() * 50000));
  const [draftMsg, setDraftMsg] = useState("");
  const [activeChannel, setActiveChannel] = useState("general");
  const [channelStates, dispatch] = useSharedReducer(
    (prevState, action: CreateChannelAction | SendMessageAction) => {
      switch (action.type) {
        case Action.CREATE_CHANNEL: {
          return { ...prevState, [action.channel]: [] };
        }
        case Action.SEND_MESSAGE: {
          return {
            ...prevState,
            [action.channel]: [
              ...prevState[action.channel],
              { sender: self, contents: action.message }
            ]
          };
        }
      }
    },
    clackState
  );

  return (
    <>
      <Head>
        <title>{`Clack | #${activeChannel}`}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans&display=swap"
          rel="stylesheet"
        />
        <style>{style}</style>
      </Head>
      <div id="sidebar">
        <ChannelList
          channels={useMemo(() => Object.keys(channelStates), [channelStates])}
          currentChannel={activeChannel}
          onSelect={channel => setActiveChannel(channel)}
          onCreate={channel => {
            dispatch({ type: Action.CREATE_CHANNEL, channel });
            setActiveChannel(channel);
          }}
        />
      </div>
      <div id="content">
        <ChatChannel
          name={activeChannel}
          messages={channelStates[activeChannel]!}
        />
        <MessageBox
          value={draftMsg}
          onChange={setDraftMsg}
          onSubmit={() => {
            // Maybe lower state
            if (draftMsg.length > 0) {
              dispatch({
                type: Action.SEND_MESSAGE,
                channel: activeChannel,
                message: draftMsg
              });
              setDraftMsg("");
            }
          }}
        />
      </div>
    </>
  );
};

renderCalderaApp(<ClackApp />);
