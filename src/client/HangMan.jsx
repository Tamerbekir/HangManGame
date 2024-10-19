import Buttons from './components/Buttons'
import { useState } from 'react'


const HangMan = () => {

  const [userWordPick, setUserWordPick] = useState({
    userWord: ''
  })

  const [underScoreWord, setUnderScoreWord] = useState('')

  const [gameStarted, setGameStarted] = useState(false)


  const handleWordChange = (event) => {
    const { name, value } = event.target;
    setUserWordPick({
      ...userWordPick,
      [name]: value
    })
  }

  const handleSubmitWord = () => {

    const wordWithUnderscore = userWordPick.userWord.split('')
    let word = ''
    // console.log(wordWithUnderscore)

    for (let i = 0; i < wordWithUnderscore.length; i++) {
      if (wordWithUnderscore[i] === ' ') {
        word += ' '
      } else {
        word += '_  '
      }


    }

    setUnderScoreWord(word)

    setGameStarted(true)
  }



  return (
    <div>
      <div className='buttonsDiv'>
        <Buttons />
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
            <button onClick={() => setGameStarted(false)}>Reset</button>
            <p className='gameStartedTag'>The Game as started!</p>
            <p className="hiddenWordTag">{underScoreWord}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default HangMan;