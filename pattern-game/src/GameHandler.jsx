import React from 'react'

export default function GameHandler() {
  const STARTING_RANGE = 26;
  const PATTERN_LENGTH = 5;
  const storage = React.useRef({});
  const [patternFunctions, setPatternFunctions] = React.useState([]);
  const [patternTerms, setPatternTerms] = React.useState([]);
  const [game, setGame] = React.useState(0);

  // initialise all pattern functions into patternFunctions
  React.useEffect(() => {
    setPatternFunctions([
      arithmeticPattern, 
      pattern2
    ]);
  }, []);

  // New Game: generate pattern of length PATTERN_LENGTH, from 0 to STARTING_RANGE -1 
  // clear other data
  React.useEffect(() => {
    generatePattern(Math.trunc(Math.random() * STARTING_RANGE), PATTERN_LENGTH);
    storage.current= {};
  }, [game]);

  // pick random pattern from patternFunctions and generate sequence into patternTerms
  const generatePattern = (input, numberOfTerms) => {
    if (patternFunctions.length === 0) return;

    const randFunc = patternFunctions[Math.trunc(Math.random() * patternFunctions.length)];
    const temp = [input];
    for (let i = 0; i < numberOfTerms - 1; i++) {
      temp.push(randFunc(temp[i], storage));
    }
    setPatternTerms(temp);
  }

  console.log(patternTerms);  // debug
  // print pattern
  return (
    <>
    {patternTerms.map((term, i) =>  {
      return (
        <div key={i}>{term}</div>
      )
    })}
    <button onClick={() => setGame(prev => prev + 1)}>Generate New Pattern</button>
    </>
  )
}

/////////////////////////////////////////
/// Patterns
/////////////////////////////////////////

// Pattern functions must only have parameters: (input, storage)

/* 
 * Generate number from 1-15
 * Sequence adds by that number
 * 
 * Example (+7): 0, 7, 14, 21, 28
 */
function arithmeticPattern(input, storage) {
  if (!storage.current.arithmetic) {
    const a = Math.trunc(Math.random() * 16);
    storage.current = {...storage.current, arithmetic: a};
    return input + a;
  }
  return input + storage.current.arithmetic;
}

function pattern2(input) {
  return input + 2;
}