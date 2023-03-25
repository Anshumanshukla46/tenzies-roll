import React from "react";
import Die from "./Components/Die"
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {

  /**
   * EXTRA IDES 
   * 1. CSS:put real dots on the dice
   * 2. Track number of rolls
   * 3. Track number of time to win
   * 4. save score to local storage
   * 
   * TRY TO BUILD QUIZICAL APP FROM API :)
   */

  const [dice, setDice] = React.useState(allNewDice()) // used nanoid for key 

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {

    // every() is an array method which return true if all it's elements satisfy the condition

    const allTrue = dice.every(old => old.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(item => (item.value === firstValue)) // if all value are same

    if (allTrue && allSameValue) {
      setTenzies(true)
      console.log("all true");
    }

  }, [dice])




  function allNewDice() {
    const dice = []; // array of objects

    for (let i = 0; i < 10; i++) {
      // Generate a random number between 1 and 6 inclusive otherwise their will be more roll :)
      const roll = Math.floor(Math.random() * 6) + 1; // as random Generate usually like 0.3478 

      dice.push({
        // or we can call the generateNewDieObject() also 
        value: roll,
        isHeld: false,
        id: nanoid()
      });

    }

    return dice;
  }



  function generateNewDieObject() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }


  function rollDice() {
    if (!tenzies) { // not all_true

      setDice(oldDice => oldDice.map(curDie => {
        return curDie.isHeld ? curDie : generateNewDieObject()
      }))

    } else {
      setTenzies(false)
      setDice(allNewDice())
    }

  }


  // flipping the isHeld as we only want to roll the dice next time for others
  function holdDice(id) {

    setDice(oldDice => oldDice.map(curDie => {
      return (curDie.id === id) ? { ...curDie, isHeld: !curDie.isHeld } : curDie
    }))

  }



  const diceElements = dice.map(item => { // in dice each item is object
    return (

      <Die

        key={item.id}
        value={item.value}
        isHeld={item.isHeld}
        holdDice={() => { holdDice(item.id) }}
      // passed function because in react their is a way to connect from "PARENT TO CHILD"
      // but not from "CHILD TO PARENT"
      />

    )
  })


  return (
    <main>

      {/* jilmilane wale */}
      {tenzies && <Confetti width={800} height={500} />}

      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <div className="dice-container">
        {diceElements}
      </div>

      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
