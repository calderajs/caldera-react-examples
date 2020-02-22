// Hack to get highlighting
const css = (input: TemplateStringsArray) => {
  if (input.length !== 1) {
    throw new Error("This is not a real CSS tag");
  }
  return input[0];
};

const style = css`
  html,
  body {
    height: 100%;
    margin: 0;
    font-family: "Work Sans", sans-serif !important;
    font-size: 14px;
  }

  input,
  button {
    font-family: "Work Sans", sans-serif;
    font-size: 14px;
  }

  body {
    display: flex;
  }

  #root {
    display: flex;
    flex: 1;
  }

  #sidebar {
    min-width: 0;
    flex-basis: 200px;
    background-color: #262d4a;
    color: white;
  }

  .channelItem {
    margin: 8px 0;
    padding: 8px 16px;
    font-weight: 700;
    cursor: pointer;
  }

  .channelItem:hover {
    background-color: #00000033;
  }

  .channelItem.current {
    background-color: #d42869;
  }

  #content {
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .chatChannel {
    flex: 1;
  }

  .createChannel {
    display: flex;
    padding: 8px 16px;
  }

  .createChannel .newChannelInput {
    flex: 1;
    -webkit-appearance: none;
    border: none;
    background: none;
    outline: none;
    color: white;
    border-bottom: 1px solid #ffffff44;
    margin-right: 12px;
    min-width: 0;
  }

  .createChannel .newChannelInput::placeholder {
    color: #ffffff66;
  }

  .createChannel .newChannelInput:focus {
    border-bottom: 1px solid #d42869;
  }

  .createChannel .newChannelButton {
    -webkit-appearance: none;
    background: none;
    border: 1px solid #ffffff44;
    border-radius: 4px;
    color: white;
  }

  .createChannel .newChannelButton:hover {
    border: 1px solid white;
    background: white;
    color: #262d4a;
  }

  .messageBox {
    align-self: stretch;
    display: flex;
    margin: 0 20px;
    margin-bottom: 20px;
  }

  .messageBox .input {
    flex: 1;
    border-radius: 4px;
    padding: 8px;
    border: 1px solid #ccc;
    -webkit-appearance: none;
  }

  .messageBox .sendButton {
    -webkit-appearance: none;
    color: white;
    background-color: #d42869;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    margin-left: 8px;
  }

  .messageBox .sendButton:hover {
    background-color: #ad2055;
  }

  .chatChannel {
    padding: 0 12px;
    padding-top: 20px;
    overflow-y: auto;
  }

  .chatChannel .messageWrapper {
    padding: 4px 0;
  }

  .chatChannel .message {
    padding: 8px;
    border-left: 4px solid transparent;
  }

  .chatChannel .message:hover {
    background-color: #f2f2f2;
  }
`;

export default style;
