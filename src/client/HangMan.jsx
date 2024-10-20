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
    const revealWord = userWordPick.userWord.split('').map((character, index) => {
      if (character.toUpperCase() === letter.toUpperCase()) {
        return character
      }
      return underScoreWord[index]
    })

    const convertLetters = revealWord.map((character, index) => (
      <span key={index}>{character}</span>
    ))

    setUnderScoreWord(convertLetters)
  }

  const resetGame = () => {
    alert('Your game has been restarted.')
    window.location = '/'
  }

  console.log(`
        + --- +
  |   |
      |
      |
      |
      |
=========
  +---+
  |   |
  O   |
      |
      |
      |
=========
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========
  +---+
  |   |
  O   |
 /|\  |
      |
      |
=========
  +---+
  |   |
  O   |
 /|\  |
 /    |
      |
=========
  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========`)

  return (
    <div>
      <div className='buttonsDiv'>
        <Buttons onSelectButton={handleSelectedLetter} />
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