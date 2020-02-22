import React, { useRef, useEffect } from "react";
import { ClackMessage } from ".";
import randomColor from "randomcolor";

// Need ref for scrollIntoView
const Message = ({ message }: { message: ClackMessage }) => {
  return (
    <div className="messageWrapper">
      <div
        className="message"
        style={{
          borderLeftColor: randomColor({
            seed: message.sender,
            luminosity: "bright"
          })
        }}
      >
        {message.contents}
      </div>
    </div>
  );
};

const ChatChannel = ({
  name,
  messages
}: {
  name: string;
  messages: ClackMessage[];
}) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length > 0 && endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView(false);
    }
  }, [messages]);

  return (
    <div className="chatChannel">
      {messages.map((msg, i) => (
        <Message message={msg} key={i} />
      ))}
      <div ref={endOfMessagesRef} style={{ height: "8px" }} />
    </div>
  );
};

export default ChatChannel;
