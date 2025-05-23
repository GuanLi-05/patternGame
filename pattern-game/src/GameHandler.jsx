import React from 'react'

export default function GameHandler() {
  const STARTING_RANGE = 26;
  const PATTERN_LENGTH = 5;
  const [patterFunctions, setPatternFunctions] = React.useState([]);
  const [patternTerms, setPatternTerms] = React.useState([]);
  const [game, setGame] = React.useState(0);

  // initialise all pattern functions into patterFunctions
  React.useEffect(() => {
    setPatternFunctions([pattern1, pattern2]);
  }, []);

  // generate pattern of length PATTERN_LENGTH, from 0 to STARTING_RANGE -1 
  React.useEffect(() => {
    generatePattern(Math.trunc(Math.random() * STARTING_RANGE), PATTERN_LENGTH)
  }, [game]);

  // pick random pattern from patterFunctions and generate sequence into patternTerms
  const generatePattern = (input, numberOfTerms) => {
    if (patterFunctions.length === 0) return;

    const randFunc = patterFunctions[Math.trunc(Math.random() * patterFunctions.length)];
    const temp = [input];
    for (let i = 0; i < numberOfTerms - 1; i++) {
      temp.push(randFunc(temp[i]));
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

function pattern1(input) {
  return input + 1;
}

function pattern2(input) {
  return input + 2;
}