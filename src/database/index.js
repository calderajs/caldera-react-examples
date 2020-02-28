import { MongoClient } from "mongodb";
import { renderCalderaApp, useSharedState, makeSharedResource } from "caldera";
import React, { useState, useEffect } from "react";

const url = "mongodb://localhost:27017/";

const client = new MongoClient(url);
let col;

const Card = ({ text }) => <div className="card">{text}</div>;

const cardResouce = makeSharedResource([]);

const Board = () => {
  const [cards, setCards] = useSharedState(cardResouce);
  const [draft, setDraft] = useState([]);

  const expire = toRemove => {
    setCards(cards => cards.filter(c => c.text != toRemove));
    col.remove({ text: toRemove });
  };

  useEffect(() => {
    if (!col) {
      client.connect(() => {
        col = client.db("board").collection("messages");
      });
    }
    (async () => setCards((await (await col.find({})).toArray()) || []))();
  }, []);

  return (
    <>
      <div>
        {cards.map((c, i) => (
          <Card text={c.text} />
        ))}
        <form
          onSubmit={e => {
            e.preventDefault();
            if (draft === "") return;
            setCards(cards => [...cards, { text: draft }]);
            setDraft("");
            col.insertOne({ text: draft });
            setTimeout(() => expire(draft), 2000);
          }}
        >
          <input
            className="newItemInput"
            onChange={e => setDraft(e.target.value)}
            value={draft}
          ></input>
          <button className="newItemButton" type="submit">
            ➕
          </button>
        </form>
      </div>
    </>
  );
};

renderCalderaApp(<Board />);
