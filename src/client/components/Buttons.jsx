import { useState } from 'react'

const Buttons = ({ onSelectButton }) => {

  const [alphabet, setAlphabet] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
  const [buttonSelected, setButtonSelected] = useState([])

  const handleLetters = (selection) => {
    setAlphabet(alphabet.filter((letter) => letter !== selection))
    setButtonSelected([...buttonSelected, selection].join(' '))
    onSelectButton(selection)
  }



  return (
    <div>
      {alphabet.map((letter, index) => (
        <button key={index} onClick={() => handleLetters(letter)}>{letter}</button>
      ))}
      <div>
        <h3>Used Letters</h3>
        <p>{buttonSelected}</p>
      </div>
    </div >
  )
}

export default Buttons