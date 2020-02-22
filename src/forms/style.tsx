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
    display: flex;
    flex-direction: column;
  }

  input,
  button {
    font-family: "Work Sans", sans-serif;
    font-size: 14px;
  }

  label {
    margin-right: 20px;
  }

  .formbox {
    margin: 20px;
  }
`;

export default style;
