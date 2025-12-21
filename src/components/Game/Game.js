import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import GameInput from '../GameInput/GameInput';
import GuessWordList from '../GuessedWordList/GuessedWordList';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guessWordList, setGuessWordList] = React.useState([]);

  function handleAddToWordList(word) {
    if (word.length < 5) {
      return;
    }

    const newValue = word.toUpperCase().slice(0, 5);
    const newGuessWordList = [...guessWordList, newValue];
    setGuessWordList(newGuessWordList);
  }

  return <>
    <GuessWordList guessWordList={guessWordList} />
    <GameInput addToWordList={handleAddToWordList}/>
  </>;
}

export default Game;
