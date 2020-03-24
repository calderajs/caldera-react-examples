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
    height: 100%;
    margin: 0;
    font-family: "Work Sans", sans-serif !important;
    font-size: 14px;
    background: #F0F0F0;
  }

  .nav-outer {
    justify-content: space-between;
    display: flex; 
    height: 64px;
    width: 100%;
    align-items: center;
    background: #FFF;
    box-shadow: 0 0 4px rgba(0,0,0,.15);
  }

  .nav-account-outer {
    padding: 0 16px;
  }

  .moo {
    min-height: 168px;
  }

  .nav-title {
    font-size: 30px;
    font-weight: bold;
    padding: 0 16px;
  }

  .nav-title {
    font-size: 30px;
    font-weight: bold;
    padding-left: 4px;
  }

  .moo-input {
    height: 42px;
    width: 400px;
    border:none;
    font-size: 16px;
  }

  .nav-search-wrapper {
    padding: 0 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,.15);
    border-radius: 4px;
    /* border-style: solid; */
  }

  .nav-search::placeholder {
    color: #888;
    opacity: 1;
    font-size: 16px;
  }

  .account {
    display: flex;
  }

  .account-pic {
    height: 42px;
    width: 42px;
    border-radius: 21px;
    color: #FFF;
    margin-right: 8px;
    font-size: 24px;
    text-align: center;
    vertical-align: middle;
    line-height: 42px;      
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
    color: #AAA;
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
    box-shadow: 0 2px 4px rgba(0,0,0,.15);
    border-radius: 4px;
    background: #FFF;
    padding: 24px;
    margin: 16px 0;

  
  }

  .new-moo-input-wrapper {
    display: flex;
  }

  .new-moo-submit-wrapper {
    display: flex;

  }

  .new-moo-wrapper {
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    min-height: 169px;
  }

  .moo-submit {
    border-radius: 4px;
    background: #36A0EC;
    color: #FFF;
    padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,.15);

  }

  .new-moo-submit-wrapper {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }

  .new-moo-char-count {
    color: #AAA;
  }

`;

export default style;
