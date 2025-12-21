import React from 'react';
import { range } from '../../utils';

function Guess({word}) {
  const emptyWordSplit = range(0, 5).map((_) => '');
  const characters = word ? word.split('') : emptyWordSplit;

  return (
    <p className="guess">
      {characters.map((ch, i) => <span className="cell" key={i}>{ch}</span> )}
    </p>
  )
}

export default Guess;
