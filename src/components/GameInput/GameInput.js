import React from 'react';

function GameInput({addToWordList}) {
  const [guessInput, setGuessInput] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (guessInput.length != 5) {
      return
    }
    addToWordList(guessInput) 
    setGuessInput('')
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input id="guess-input" name="guess-input" value={guessInput} type="text" onChange={(e) => setGuessInput((e.target.value || '').toUpperCase().slice(0, 5))}/>
    </form>
  )
}

export default GameInput;
