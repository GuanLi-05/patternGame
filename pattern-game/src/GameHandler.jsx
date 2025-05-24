import React from 'react'

export default function GameHandler() {
  const STARTING_RANGE = 26;
  const PATTERN_LENGTH = 5;
  const storage = React.useRef({});
  const [patternFunctions, setPatternFunctions] = React.useState([]);
  const [patternTerms, setPatternTerms] = React.useState([]);
  const [game, setGame] = React.useState(0);

  // initialise all pattern functions and rulesets into patternFunctions
  React.useEffect(() => {
    setPatternFunctions([
      {pattern: arithmeticPattern, ruleset: arithmeticRuleset},
      {pattern: geometricPattern, ruleset: geometricRuleset},
      {pattern: geometricArithmeticComposite, ruleset: geometricArithmeticRuleset},
      {pattern: squarePattern, ruleset: squareRuleset},
      {pattern: cubePattern, ruleset: cubeRuleset},
      {pattern: fibonacciPattern, ruleset: fibonacciRuleset},
      {pattern: fibonacciPatternV2, ruleset: fibonacciRulesetV2}
    ]);
  }, []);

  // New Game: generate pattern & clear other data
  React.useEffect(() => {
    generatePattern();
    storage.current= {};
  }, [game]);

  // generate sequence into patternTerms
  // note: stores first term by default then calls function (n - 1) times
  const generatePattern = () => {
    if (patternFunctions.length === 0) return;

    const obj = choosePattern();
    const randPattern = obj.pattern;
    const randRuleset = obj.ruleset;

    const start = getStart(randRuleset);
    const numberOfTerms = getTerms(randRuleset);

    const temp = [start]; 
    for (let i = 0; i < numberOfTerms - 1; i++) {
      temp.push(randPattern(temp[i], storage));
    }
    setPatternTerms(temp);
  }

  // choose random pattern from patternFunctions
  const choosePattern = () => {
    return patternFunctions[Math.trunc(Math.random() * patternFunctions.length)];
  }

  // choose a starting number based on ruleset
  const getStart = (ruleset) => {
    return ruleset.startingMin ? Math.trunc(Math.random() * (ruleset.startingMax - ruleset.startingMin + 1)) + ruleset.startingMin
      : Math.trunc(Math.random() * ruleset.startingMax) + 1;
  }

  // choose how many terms are in the sequence based on ruleset
  const getTerms = (ruleset) => {
    return ruleset.minTerms;
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
/// Basic Patterns
/////////////////////////////////////////

// Pattern functions must only have parameters: (input, storage)
// Define a ruleset for each pattern
// startingMax determines starting number (1 to startingMax)
// minTerms determines number of terms in sequence

/////////////////////////////////////////

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

const arithmeticRuleset = {
  startingMax: 40,
  minTerms: 3
};

/* 
 * Generate number from 2-5
 * Sequence multiplies by that number
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

const geometricRuleset = {
  startingMax: 12,
  minTerms: 3
};

/* 
 * Sequence is squared
 * 
 * Example: 2, 4, 8, 16, 32
 */
function squarePattern(input, storage) {
  alert("^2");
  return input * input;
}

const squareRuleset = {
  startingMax: 5,
  startingMin: 2,
  minTerms: 3
};

/* 
 * Sequence is cubed
 * 
 * Example: 2, 8, 512
 */
function cubePattern(input, storage) {
  alert("^3");
  return input * input * input;
}

const cubeRuleset = {
  startingMax: 2,
  startingMin: 2,
  minTerms: 3
};


/////////////////////////////////////////
/// Composite Patterns
/////////////////////////////////////////

// Composite Pattern combinations are hard coded for more control
// i.e. prevents something crazy like squarePattern + cubePattern

/////////////////////////////////////////

/* 
 * Applies Geometric Pattern
 * Then Arithmetic Patten
 * 
 * Example (x2 +1): 1, 3, 7, 15, 31
 */
function geometricArithmeticComposite(input, storage) {
  return arithmeticPattern(geometricPattern(input, storage), storage);
}

const geometricArithmeticRuleset = {
  startingMax: 12,
  minTerms: 4
}


/////////////////////////////////////////
/// Special Patterns
/////////////////////////////////////////

/* 
 * Starting two terms indentical
 * Sums the previous two terms
 * 
 * Example: 4, 4, 8, 12, 20
 */
function fibonacciPattern(input, storage) {
  if (!storage.current.fibonacci) {
    alert("fib");
    storage.current.fibonacci = [input, input];
    return input;
  } 
  const len = storage.current.fibonacci.length - 1;
  const fib = storage.current.fibonacci[len] + storage.current.fibonacci[len - 1];
  storage.current.fibonacci.push(fib);
  return fib;
}

const fibonacciRuleset = {
  startingMax: 50,
  minTerms: 4
}

/* 
 * Fibonacci with no starting term
 * Sums the previous two terms
 * 
 * Example: 4, 8, 12, 20, 32
 */
function fibonacciPatternV2(input, storage) {
  if (!storage.current.fibonacci) {
    alert("fib v2");
    storage.current.fibonacci = [input, input];
  } 
  const len = storage.current.fibonacci.length - 1;
  const fib = storage.current.fibonacci[len] + storage.current.fibonacci[len - 1];
  storage.current.fibonacci.push(fib);
  return fib;
}

const fibonacciRulesetV2 = {
  startingMax: 50,
  minTerms: 4
}