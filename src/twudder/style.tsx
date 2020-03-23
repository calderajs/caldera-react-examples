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

  .nav-title {
    font-size: 30px;
    font-weight: bold;
    padding-left: 4px;
  }

  .nav-title {
    font-size: 30px;
    font-weight: bold;
    padding-left: 4px;
  }

  .nav-search {
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

  .nav-account {
    display: flex;
    padding: 0 8px;

  }

  .nav-account-pic {
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

  .nav-account-name-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .nav-account-name {
    font-weight: bold;
  }

  .nav-account-id {
    color: #AAA;
  }

`;

export default style;
