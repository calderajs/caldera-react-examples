import React from "react";

const MessageBox = React.forwardRef(
  (
    {
      value,
      onChange,
      onSubmit
    }: {
      value: string;
      onChange: (newValue: string) => void;
      onSubmit: () => void;
    },
    ref
  ) => {
    return (
      <form
        className="messageBox"
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          className="input"
        ></input>
        <button type="submit" className="sendButton">
          Send
        </button>
      </form>
    );
  }
);

export default MessageBox;
