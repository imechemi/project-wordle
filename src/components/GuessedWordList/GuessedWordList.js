import { range } from "../../utils";
import Guess from '../Guess/Guess';

function GuessedWordList({guessWordList}) {
  const rows = range(0, 6);

  return (
    <div className="guess-results">
      {rows.map((i) => {        
        return (
          <Guess key={i} word={guessWordList[i]}/>
        );
      }
      )}
    </div>
  )
}

export default GuessedWordList;
