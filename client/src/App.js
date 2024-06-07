import React, { useEffect, useState } from "react";

function App() {
const [items, setItems] = useState([]);
const [name, setName] = useState("");
const [price, setPrice] = useState("");

useEffect(() => {
  fetchItems();
}, [])

const fetchItems = async () => {
  const response = await fetch("/api/items");
  const items = await response.json();
  setItems(items);
}

const addItem = async (e) => {
  e.preventDefault();
  const response = await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price }),
  });

  if (response.ok) {
    const newItem = await response.json();
    setItems([...items, newItem]);
    setName("");
    setPrice("");
  }}


  return (
    <div>
      
      <h1>Static</h1>
      <form id="itemForm" onSubmit={addItem}>
        <input type="text" name="name" placeholder="Item" value={name} onChange={e => setName(e.target.value)} required />
        <input type="text" name="price" placeholder="Price" value={price} onChange={e=> setPrice(e.target.value)} required />
        <button>Add</button>
      </form>
      <h2>List:</h2>
      <ul id="list">
        {items.map((item, index) => (
          <li key={index}>
            <b>{item.name}</b> - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
