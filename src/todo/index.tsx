import { initCalderaServer, Head } from "caldera";
import React, { useState } from "react";
import { Nominal } from "simplytyped";
import style from "./style";

type ItemID = Nominal<number, "ItemID">;
let key = 0;
const generateKey = () => {
  return key++ as ItemID;
};

interface TodoListItem {
  key: ItemID;
  value: string;
}

const TodoListItemComponent = ({
  value,
  onDone
}: {
  value: string;
  onDone: () => void;
}) => (
  <div className="TodoListItem">
    <div className="TodoListValue">{value}</div>
    <button className="onDoneButton" onClick={onDone}>
      ✖️
    </button>
  </div>
);

const TodoApp = () => {
  const [items, setItems] = useState<TodoListItem[]>([]);
  const [newItem, setNewItem] = useState<string>("");

  return (
    <>
      <Head>
        <title>{`Caldera | Todo (${items.length} ${
          items.length === 1 ? "Item" : "Items"
        })`}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans&display=swap"
          rel="stylesheet"
        />
        <style>{style}</style>
      </Head>
      <div className="main">
        {items.map(item => (
          <TodoListItemComponent
            key={item.key}
            value={item.value}
            onDone={() => setItems(items.filter(i => i.key !== item.key))}
          />
        ))}

        <form
          onSubmit={e => {
            e.preventDefault();
            if (newItem === "") return;
            setItems([
              ...items,
              {
                value: newItem,
                key: generateKey()
              }
            ]);
            setNewItem("");
          }}
        >
          <input
            className="newItemInput"
            onChange={e => {
              setNewItem(e.target.value);
            }}
            value={newItem}
          ></input>
          <button className="newItemButton" type="submit">
            ➕
          </button>
        </form>
      </div>
    </>
  );
};

initCalderaServer(<TodoApp />);
