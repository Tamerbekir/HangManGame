import Buttons from './components/Buttons'
import { useState } from 'react'
import '../App.css'


const HangMan = () => {

  const [userWordPick, setUserWordPick] = useState({
    userWord: ''
  })

  const [underScoreWord, setUnderScoreWord] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedLetter, setSelectedLetter] = useState([])

  const [wrongGuess, setWrongGuess] = useState(0)
  const [showBodyPart, setShowBodyPart] = useState([])

  const bodyPart = [
      `
      +---+
      |   |
      O   |
          |
          |
          |
      =========`,
      `
      +---+
      |   |
      O   |
      |   |
          |
          |
      =========`,
      `
      +---+
      |   |
      O   |
    /|   |
          |
          |
      =========`,
      `
      +---+
      |   |
      O   |
    /|\\  |
          |
          |
      =========`,
      `
      +---+
      |   |
      O   |
    /|\\  |
    /    |
          |
      =========`,
      `
      +---+
      |   |
      O   |
    /|\\  |
    / \\  |
          |
      =========`,
    ]

  // console.log(bodyPart)


  const handleWordChange = (event) => {
    const { name, value } = event.target;
    setUserWordPick({
      ...userWordPick,
      [name]: value
    })
  }


  const handleSubmitWord = () => {
    const wordWithUnderscore = userWordPick.userWord.split('')
    const word = wordWithUnderscore.map((characters, index) => {
      if (characters === ' ') {
        return <span key={index} style={{ wordSpacing: '1px' }}>&#12288;</span>
      } else {
        return <span key={index} style={{ fontSize: '40px' }}> _ </span>
      }
    })
    setUnderScoreWord(word)
    setGameStarted(true)
  }

  const handleSelectedLetter = (letter) => {
    setSelectedLetter([...selectedLetter, letter])
    const splitWord = userWordPick.userWord.split('')
    let correctGuess = false

    const revealWord = splitWord.map((character, index) => {
      if (character.toUpperCase() === letter.toUpperCase()) {
        correctGuess = true
        return character
      } 
      return underScoreWord[index]
    })

    if (!correctGuess) {
      setWrongGuess(wrongGuess+1)
      setShowBodyPart(bodyPart.slice(0,wrongGuess+1))
    }

    const convertLetters = revealWord.map((character, index) => (
        <span key={index}>{character}</span>)
    )

    setUnderScoreWord(convertLetters)
  }

  // const handleWrongLetter = (letter) => {
  //   setSelectedLetter({...selectedLetter, letter})
  //   const splitWord = userWordPick.userWord.split('')
  //   const wrongLetter = splitWord.map((character, index) => {
  //     if(character.toUpperCase() != letter.toUpperCase()) {
  //       setLeftArm()
  //     }
  //     return underScoreWord([index])
  //   })

  //   const converWrongLetter = wrongLetter.map((character, index) => (
  //     <span key={index}>{character}</span>
  //   ))

  //   setWrongLetter(converWrongLetter)
  // }

  const resetGame = () => {
    alert('Your game has been restarted.')
    window.location = '/'
  }

  return (
    <div>
      <div className='buttonsDiv'>
        <Buttons onSelectButton={handleSelectedLetter} />

        {wrongGuess > 0 && (
          <pre style={{whiteSpace: 'pre'}}>  
        {showBodyPart[wrongGuess - 1]}
        </pre>
        )}
        {wrongGuess >= 7 && (
          <p>YOU LOSE! The correct word was " {userWordPick.userWord} "</p>
        )}
        {underScoreWord === 0 && (
          <p>Good job</p>
        )}
      </div>
      <div>
        {!gameStarted && (
          <div>
            <p>Type your word</p>
            <input
              name='userWord'
              value={userWordPick.userWord}
              onChange={handleWordChange}
              className="userWord">
            </input>
            <button
              onClick={handleSubmitWord}
            >Submit</button>
            <p className="sneakPeakTag">pst..sneak peak. Don't let the other player see..</p>
            <p className="yourWordTag">Your word Below</p>
            <p className="wordSelectedTag">{userWordPick.userWord}</p>
          </div>
        )}
        {gameStarted && (
          <>
            <button onClick={resetGame}>Reset</button>
            <p className='gameStartedTag'>The Game as started!</p>
            <p className="hiddenWordTag">{underScoreWord}</p>
            <p className="wordSelectedTag">{userWordPick.userWord}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default HangMan;