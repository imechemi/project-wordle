import React from 'react';

import { range, sample } from '../../utils';
import { WORDS } from '../../data';
import GameInput from '../GameInput/GameInput';
import GuessWordList from '../GuessedWordList/GuessedWordList';
import { checkGuess } from '../../game-helpers';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guessWordList, setGuessWordList] = React.useState([]);
  const [isWon, setIsWon] = React.useState(false);

  const keyboard = [];
  for (row = 0; row < 3; row++) {
    const currentRow = []
    for (k = 0; k < Math.ceil(26 / 3); k++) {
      const code = (Math.ceil(26 / 3) * row + k);
      if (code > 25) {
        break 
      }
      currentRow.push({ letter: String.fromCharCode(97 + code), status: '' });
    }
    keyboard.push(currentRow);
  }

  function handleAddToWordList(word) {
    if (isWon) return;

    if (word.length < 5 || guessWordList.length == 6) {
      return;
    }

    const newWord = word.toUpperCase().slice(0, 5);
    const result = checkGuess(newWord, answer);

    const newEntry = {
      id: guessWordList.length,
      word: newWord,
      result: result
    }
    
    const newGuessWordList = [...guessWordList, newEntry];
    setGuessWordList(newGuessWordList);
    console.log("Result: ", result);

    const newIsWonState = result.find((item) => item.status != 'correct' ) ? false : true
    console.log("IsWon", newIsWonState);

    if (newIsWonState) {
      setIsWon(true)
    }
  }

  return <>
    {isWon &&
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in
        <strong> {guessWordList.length} guesses</strong>.
      </p>
    </div>
  }
    {(!isWon && guessWordList.length == 6) &&
    <div className="sad banner">
      <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
    </div>
    }
    
    <GuessWordList guessWordList={guessWordList} />
    <GameInput addToWordList={handleAddToWordList}/>

    <div className="keyboard">
      {range(0, 26).map(i => 
        <span>{String.fromCharCode(97 + i)}</span>
      )}
    </div>
  </>;
}

export default Game;
