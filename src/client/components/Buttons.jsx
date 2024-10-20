import { useState } from 'react'

const Buttons = () => {

  const [alphabet, setAlphabet] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
  const [buttonSelected, setButtonSelected] = useState([])

  const handleLetters = (selection) => {
    setAlphabet(alphabet.filter((letter) => letter !== selection))
    setButtonSelected([...buttonSelected, selection].join(' '))
  }



  return (
    <div>
      {alphabet.map((letter, index) => (
        <button key={index} onClick={() => handleLetters(letter)}>{letter}</button>
      ))}
      <div>
        <h3>Selected Letters</h3>
        <p>{buttonSelected}</p>
      </div>
    </div >
  )
}

export default Buttons