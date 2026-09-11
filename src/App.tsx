

import Srand from "seeded-rand";
import "./assets/Defaults.css";
import { randFloatToInt, randFloatToIntString } from "./utils/Utils";
import { useState } from "react";

function App() {

  const [number, setNumber] = useState<number>(-1);
  const [numberString, setNumberString] = useState<string>("------");
  const [seed, setSeed] = useState<string>();
  const [seedInput, setSeedInput] = useState<string>("");
  const [numberHistory, setNumberHistory] = useState<number[]>([]);
  const [numberHistoryString, setNumberHistoryString] = useState<string>("");

  
  

  const generateNumber = (customSeed: string = "") => {

    console.log(number); // dumbass npm won't build if one variable is unused


    // do not edit the flow of random number generation, because this will usually change the outputs of seeds






    let seedBase_: number = randFloatToInt(Math.random(), 16);
    let seedGenNumber_: number = randFloatToInt(Math.random(), 3);
    let tempSeed_: string =  seedBase_.toString() + "-" + seedGenNumber_.toString();//randFloatToInt(Math.random(), 1);
    if (customSeed) {
      tempSeed_ = customSeed;
      seedBase_ = parseInt(customSeed.split("-")[0]);
      seedGenNumber_ = parseInt(customSeed.split("-")[1]);
    }
    const tempSeed = tempSeed_;
    const seedBase = seedBase_;
    const seedGenNumber = seedGenNumber_;
    Srand.seed(seedBase);
    setSeed(tempSeed);


    let numberResultString: string = "-1";
    for (let i = 0; i < seedGenNumber + 1; i++) {
      numberResultString = randFloatToIntString(Srand.random(), 6);
    }
    const numberResult = parseInt(numberResultString);
    setNumber(numberResult);
    setNumberString(numberResultString);

    if (!customSeed) {
      const tempNumberHistory = [...numberHistory]
      tempNumberHistory.push(numberResult);
      setNumberHistory([...tempNumberHistory]);

      const tempNumberHistoryString = numberResultString + "   ||| Seed:   " + tempSeed.toString() + "\n" + numberHistoryString; // band-aid fix for printing seed, implement seedHistory and separate column later.
      setNumberHistoryString(tempNumberHistoryString);
    }

    /*alert(
      seed + "\n" + 
      numberResultString
      //randFloatToIntString(Srand.random(), 8)
    )*/
  }

  const handleGenerateNumber = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    generateNumber();
  }

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (seedInput) {
        generateNumber(seedInput);
      }
    } catch (error) {
      alert(error);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setSeedInput(event.target.value);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <button onClick={handleGenerateNumber}>
        Generate random number
      </button>
      <h1>
        {numberString}
      </h1>
      <h3>
        Seed: {seed}
      </h3>
      <form onSubmit={handleSubmit}>
        <h1>
          Test seed:
        </h1>
        <p>
          (1-16 digits)-(1-3 digits)
        </p>
        <input 
          type="text"
          value={seedInput}
          onChange={handleInputChange}
          id="testSeed" />
        <button type="submit">
          Submit
        </button>
      </form>

      <p style={{ whiteSpace: 'pre-line' }}>
        {numberHistoryString}
      </p>
    </>
  )
}

export default App
