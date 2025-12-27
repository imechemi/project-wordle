import React from 'react';
import { range } from '../../utils';
import { checkGuess } from '../../game-helpers';

function Guess({ wordInfo }) {
  const emptyWordSplit = ['', '', '', '', ''];
  const rowInfo = wordInfo ? wordInfo : { 'word': '', 'result': {} }
  const characters = rowInfo['word'].length == 5 ? rowInfo['word'].split('') : emptyWordSplit;

  return (
    <p className="guess">
      {characters.map((ch, i) => 
      <span className={`cell ${rowInfo['result']?.[i]?.['status']}`} key={i}>{ch}</span> 
      )}
    </p>
  )
}

export default Guess;
