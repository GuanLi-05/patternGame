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
      geometricPattern
    ]);
  }, []);

  // New Game: generate pattern & clear other data
  React.useEffect(() => {
    generatePattern();
    storage.current= {};
  }, [game]);

  // generate sequence into patternTerms
  const generatePattern = () => {
    if (patternFunctions.length === 0) return;

    const randPattern = choosePattern();

    // TEMP:
    const start = 3;
    const numberOfTerms = 5;
    // 

    const temp = [start]; 
    for (let i = 0; i < numberOfTerms - 1; i++) {
      temp.push(randPattern(temp[i], storage));
    }
    setPatternTerms(temp);
  }

  // choose random pattern from patternFunctions
  // can also choose multiple to create composite patterns
  const choosePattern = () => {
    /* const randFunc = patternFunctions[Math.trunc(Math.random() * patternFunctions.length)];
    return randFunc; */

    const funcOne = patternFunctions[0];
    const funcTwo = patternFunctions[1];

    return (input) => funcOne(funcTwo(input, storage), storage);
  }

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
    const a = Math.trunc(Math.random() * 15) + 1;
    storage.current = {...storage.current, arithmetic: a};
    alert("+" + a);
    return input + a;
  }
  return input + storage.current.arithmetic;
}

/* 
 * Generate number from 2-5
 * Sequence adds by that number
 * 
 * Example (x3): 2, 6, 18, 54, 162
 */
function geometricPattern(input, storage) {
  if (!storage.current.geometric) {
    const g = Math.trunc(Math.random() * 4) + 2;
    storage.current = {...storage.current, geometric: g};
    alert("x" + g);
    return input * g;
  }
  return input * storage.current.geometric;
}