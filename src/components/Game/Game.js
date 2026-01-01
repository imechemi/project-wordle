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
  const [letterStatus, setLetterStatus] = React.useState(initializeLetters());

  function initializeLetters() {
    const result = {};
    for (row = 0; row < 3; row++) {
      for (k = 0; k < Math.ceil(26 / 3); k++) {
        const code = (Math.ceil(26 / 3) * row + k);
        if (code > 25) {
          break 
        }
        const ch = String.fromCharCode(97 + code);
        result[ch] = 0;
      }
    }
    return result;
  }
  

  // function updateKeyboard(wordList) {
  //   const guessedLetters = new Set(wordList.map((guessWordInfo) => guessWordInfo.word.split('')).flatMap((x) => x));
  //   const guessLettersMap = Array.from(guessedLetters).reduce((acc, v) => {acc[v] = true; return acc;}, {});
  //   setLetterStatus(guessLettersMap);
  // }

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

    const nextLetterStatus = {...letterStatus};
    console.log(nextLetterStatus);
    newWord.split('').forEach((ch) => {
      nextLetterStatus[ch.toLowerCase()]++;
    });
    setLetterStatus(nextLetterStatus);

    const newIsWonState = result.find((item) => item.status != 'correct' ) ? false : true
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

    <ul className="keyboard">
      {Object.entries(letterStatus).map((item) => (
        <li key={item[0]} className={`key ${item[1] > 0 ? 'active' : ''}`}>{item[0]}</li>
      ))}
    </ul>

    <GameInput addToWordList={handleAddToWordList}/>
  </>;
}

export default Game;
