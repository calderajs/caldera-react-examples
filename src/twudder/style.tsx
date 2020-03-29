// Hack to get highlighting
const css = (input: TemplateStringsArray) => {
  if (input.length !== 1) {
    throw new Error("This is not a real CSS tag");
  }
  return input[0];
};

const style = css`
  *:focus {
    outline: none;
  }

  body {
    margin: 0;
    font-size: 14px;
    background: #f0f0f0;
  }

  html,
  body,
  #root,
  #twudder-app {
    height: 100%;
  }

  body,
  input,
  textarea {
    font-family: "Roboto", sans-serif;
  }

  .nav-outer {
    display: flex;
    height: 64px;
    width: 100%;
    align-items: center;
    background: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    position: sticky;
    top: 0;
  }

  .nav-account-outer {
    padding: 0 16px;
    margin-left: auto;
  }

  .moo {
    padding: 24px;
  }

  .nav-title {
    margin-right: auto;
    font-size: 30px;
    font-weight: bold;
    padding: 0 16px;
    cursor: pointer;
  }

  .moo-input {
    height: 42px;
    border: none;
    font-size: 16px;
    padding: 0;
    width: 100%;
  }

  .search {
    width: 400px;
  }

  .moo-input.moo-textarea {
    height: auto;
    resize: none;
    width: 100%;
    padding: 0;
  }

  .input-wrapper {
    padding: 0 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    /* border-style: solid; */
  }

  .nav-search::placeholder {
    color: #888;
    opacity: 1;
    font-size: 16px;
  }

  .moo-content {
    padding-top: 16px;
    font-size: 18px;
  }

  .account {
    display: flex;
  }

  .account-pic {
    height: 42px;
    width: 42px;
    border-radius: 21px;
    color: #fff;
    margin-right: 12px;
    font-size: 24px;
    text-align: center;
    vertical-align: middle;
    line-height: 42px;
    flex-shrink: 0;
  }

  .account-name-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .account-name {
    font-weight: bold;
  }

  .account-id {
    color: #aaa;
  }

  .feed-outer {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .feed-inner {
    width: 514px;
    display: flex;
    flex-direction: column;
  }

  .moo-box {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    background: #fff;
    margin: 16px 0;
  }

  .new-moo-input-wrapper {
    display: flex;
    margin-bottom: 12px;
  }

  .new-moo-submit-wrapper {
    display: flex;
  }

  .new-moo-wrapper {
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    padding: 24px;
  }

  input[type="button"],
  input[type="submit"] {
    border-radius: 4px;
    background: #36a0ec;
    color: #fff;
    padding: 12px 32px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    transition: background 0.2s;
  }

  input[type="button"]:hover {
    background: #43abf5;
  }

  input[type="button"]:active {
    background: #2691de;
  }

  input[type="button"]:disabled {
    background: #a0a0a0;
  }

  .new-moo-submit-wrapper {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }

  .new-moo-char-count {
    color: #aaa;
  }

  .login {
    position: absolute;
    right: 16px;
    width: 300px;
  }

  .login-inner {
    padding: 12px 24px;
  }
  .toggle-wrapper {
    display: flex;
    width: 100%;
    text-align: center;
    margin-bottom: 16px;
  }
  .spacer {
    width: 8px;
  }
  .toggle {
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    padding: 8px 0;
    /* border-bottom: 2px solid #36A0EC; */
    color: #aaa;
    cursor: pointer;
  }

  .active {
    border-bottom: 2px solid #36a0ec;
    color: #000;
  }

  .login-padding {
    height: 12px;
  }
  .login-button {
    width: 100%;
  }
`;

export default style;
