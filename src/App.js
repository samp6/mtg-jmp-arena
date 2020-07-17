import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Dropdown, Button, Container, TextArea } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './decks.js';
import deckJson from './decks.js';

const decks = JSON.parse(deckJson);
const deckOptions = createDropdownOptions(decks);

function App() {
  const [selection1, setSelection1] = useState();
  const [selection2, setSelection2] = useState();

  let deckText = [];
  if(selection1 && selection2) {
    deckText = [decks[selection1].contents, decks[selection2].contents];
  }
  
  let dropdowns = DeckDropdowns({selection1, setSelection1, selection2, setSelection2});

  let buttonClick = () => {
    let val1 = Math.floor(Math.random() * 121);
    let val2 = Math.floor(Math.random() * 121);
    while(val1 == val2) {
      val2 = Math.floor(Math.random() * 121);
    }
    setSelection1(decks[val1].key);
    setSelection2(decks[val2].key);
  }

  return (
    <div>
      {dropdowns}
      <Button 
        onClick={buttonClick}
      >
        Randomize
      </Button>
      <TextArea
        value={deckText[0] + "\n" + deckText[1]}
      />
    </div>
  );
}

function createDropdownOptions(decks) {
  const options = [];
  let i = 0;
  decks.forEach(deck => {
    let option = {
      key: i,
      text: deck.name,
      value: i
    };
    deck.key = i;
    options.push(option);
    i++;
  });
  return options;
}

const DeckDropdowns = ({selection1, setSelection1, selection2, setSelection2}) => {
  let handleChange1 = (e, data) => {
    console.log(data.value)
    setSelection1(data.value);
  }

  let handleChange2 = (e, data) => {
    console.log(data.value)
    setSelection2(data.value);
  }

  const dropdown1 = <Dropdown
    placeholder="Select a deck"
    name="Deck 1"
    selection
    onChange={handleChange1}
    options={deckOptions}
    value={selection1}
  />;
  const dropdown2 = <Dropdown
    placeholder="Select a deck"
    name="Deck 2"
    selection
    onChange={handleChange2}
    options={deckOptions}
    value={selection2}
  />;

  
  return (
    <div>
      {dropdown1}
      {dropdown2}
    </div>
  )
}

export default App;