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
    padding: 0 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,.15);
    border-radius: 4px;
    /* border-style: solid; */
  }

  .nav-search::placeholder {
  color: #888;
  opacity: 1;
  font-size: 16px;
}


`;

export default style;
