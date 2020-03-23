// Hack to get highlighting
const css = (input: TemplateStringsArray) => {
  if (input.length !== 1) {
    throw new Error("This is not a real CSS tag");
  }
  return input[0];
};

const style = css`
  body {
    height: 100%;
    margin: 0;
    font-family: "Work Sans", sans-serif !important;
    font-size: 14px;
  }

  .nav-outer {
    justify-content: space-between;
    display: flex; 
    height: 64px;
    width: 100%;
    align-items: center;
  }

  

`;

export default style;
