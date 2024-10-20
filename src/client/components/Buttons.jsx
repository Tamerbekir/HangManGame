import { useState } from 'react'

const Buttons = () => {

  const [alphabet, setAlphabet] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))

  const handleLetters = (selection) => {
    setAlphabet(alphabet.filter((letter) => letter !== selection))
  }


  return (
    <div>
      {alphabet.map((letter, index) => (
        <button key={index} onClick={() => handleLetters(letter)}>{letter}</button>
      ))}
    </div >
  )
}

export default Buttons