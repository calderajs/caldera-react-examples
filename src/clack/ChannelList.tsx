import React, { useState } from "react";

const ChannelList = ({
  channels,
  currentChannel,
  onSelect,
  onCreate
}: {
  channels: string[];
  currentChannel: string;
  onSelect: (channel: string) => void;
  onCreate: (newChannel: string) => void;
}) => {
  const [newChannel, setNewChannel] = useState("");

  return (
    <>
      {channels.map((channel, i) => (
        <div
          className={`channelItem ${
            currentChannel === channel ? "current" : ""
          }`}
          onClick={() => onSelect(channel)}
          key={channel}
        >
          #{channel}
        </div>
      ))}
      <form
        className="createChannel"
        onSubmit={e => {
          e.preventDefault();
          const normalizedChannel = newChannel.startsWith("#")
            ? newChannel.slice(1)
            : newChannel;
          if (normalizedChannel.trim().length > 0) {
            setNewChannel("");
            onCreate(normalizedChannel);
          }
        }}
      >
        <input
          className="newChannelInput"
          value={newChannel}
          onChange={e => {
            let value = e.target.value;
            if (!value.startsWith("#")) {
              value = "#" + value;
            }
            setNewChannel(value === "#" ? "" : value);
          }}
          placeholder="New channel"
        />
        <button type="submit" className="newChannelButton">
          +
        </button>
      </form>
    </>
  );
};

export default ChannelList;
