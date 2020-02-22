import React, { useState } from "react";
import {
  initCalderaServer,
  useSharedState,
  makeSharedResource,
  Head
} from "caldera";
import style from "./style";

const checkedResource = makeSharedResource(true);
const radioResource = makeSharedResource(0);
const selectResource = makeSharedResource("grapefruit");

const FormTest = () => {
  const [checked, setChecked] = useSharedState(checkedResource);
  const [value, setValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useSharedState(radioResource);
  const [selectValue, setSelectValue] = useSharedState(selectResource);

  return (
    <div className="formbox">
      <div>
        <input
          type="checkbox"
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
        Default Checked
      </div>
      <div>
        <input
          type="text"
          value={value}
          placeholder="This should be local state."
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input
            type="radio"
            checked={selectedIndex === 0}
            onChange={e => setSelectedIndex(0)}
            value="Radio 1"
          />
          Radio 1
        </label>
        <label>
          <input
            type="radio"
            checked={selectedIndex === 1}
            onChange={e => setSelectedIndex(1)}
            value="Radio 2"
          />
          Radio 2
        </label>
      </div>
      <select
        value={selectValue}
        onChange={e => setSelectValue(e.target.value)}
      >
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
        <option value="mango">Mango</option>
      </select>
      <code style={{ display: "block", whiteSpace: "pre" }}>
        {JSON.stringify(
          { checked, value, selectedIndex, selectValue },
          null,
          4
        )}
      </code>
    </div>
  );
};

const PracticalForm = () => {
  const [results, submitResults] = useState<string[]>([]);
  const [flavor, changeFlavor] = useState("Dulce de Leche");
  const [sprinkles, changeSprinkles] = useState("No");
  const [name, changeName] = useState("");

  return (
    <div className="formbox">
      <h3>A more realistic form test:</h3>
      <p>Welcome to Dad's Frozen Bananas! What's your order?</p>
      <form
        onSubmit={e => {
          submitResults([flavor, sprinkles, name]);
          e.preventDefault();
        }}
      >
        <div>
          <label>
            Pick your favorite flavor:
            <select value={flavor} onChange={e => changeFlavor(e.target.value)}>
              <option value="Chocolate">Chocolate</option>
              <option value="Caramel">Caramel</option>
              <option value="Dulce de Leche">Dulce de Leche</option>
              <option value="Coconut">Coconut</option>
            </select>
          </label>
        </div>
        <div>
          <label>Sprinkles?</label>
          <label>
            Yes
            <input
              type="radio"
              value="Yes"
              checked={sprinkles === "Yes"}
              onChange={e => changeSprinkles(e.target.value)}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              value="No"
              checked={sprinkles === "No"}
              onChange={e => changeSprinkles(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            What's your name?
            <input
              type="text"
              value={name}
              placeholder="Please type your name here."
              onChange={e => changeName(e.target.value)}
            />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <code style={{ display: "block", whiteSpace: "pre" }}>
        {JSON.stringify({ results, flavor, sprinkles, name }, null, 4)}
      </code>
    </div>
  );
};

const FormsApp = () => {
  return (
    <>
      <Head>
        <title>Forms</title>
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans&display=swap"
          rel="stylesheet"
        />
        <style>{style}</style>
      </Head>
      <FormTest />
      <PracticalForm />
    </>
  );
};

initCalderaServer(<FormsApp />);
